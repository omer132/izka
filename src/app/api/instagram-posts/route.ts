import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const username = 'izkaokculuk';
    
    // Instagram profil sayfasını çek
    const response = await fetch(`https://www.instagram.com/${username}/`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7',
        'Accept-Encoding': 'gzip, deflate, br',
        'Referer': 'https://www.instagram.com/',
      },
    });

    if (!response.ok) {
      throw new Error(`Instagram profil sayfasına erişilemedi: ${response.status}`);
    }

    const html = await response.text();

    // Yeni Instagram HTML yapısında veriler genellikle script tag'lerinde
    // Önce window._sharedData veya benzeri pattern'leri ara
    let userData = null;
    let posts = [];

    // Instagram'ın yeni yapısı: window.__additionalDataLoaded veya script type="application/json"
    // Tüm script tag'lerini kontrol et
    const scriptMatches = html.matchAll(/<script[^>]*type=["']application\/json["'][^>]*>(.*?)<\/script>/gs);
    for (const match of scriptMatches) {
      try {
        const jsonData = JSON.parse(match[1]);
        // Nested yapıda arama
        if (jsonData?.graphql?.user) {
          userData = jsonData.graphql.user;
          posts = userData.edge_owner_to_timeline_media?.edges || [];
          break;
        }
        // Farklı yapılarda arama
        if (jsonData?.entry_data?.ProfilePage?.[0]?.graphql?.user) {
          userData = jsonData.entry_data.ProfilePage[0].graphql.user;
          posts = userData.edge_owner_to_timeline_media?.edges || [];
          break;
        }
        if (jsonData?.data?.user) {
          userData = jsonData.data.user;
          posts = userData.edge_owner_to_timeline_media?.edges || [];
          break;
        }
      } catch (e) {
        // Devam et
      }
    }

    // Pattern 1: window._sharedData
    const sharedDataMatch = html.match(/window\._sharedData\s*=\s*({.+?});/);
    if (sharedDataMatch) {
      try {
        const sharedData = JSON.parse(sharedDataMatch[1]);
        const profilePage = sharedData?.entry_data?.ProfilePage?.[0];
        if (profilePage?.graphql?.user) {
          userData = profilePage.graphql.user;
          posts = userData.edge_owner_to_timeline_media?.edges || [];
        }
      } catch (e) {
        console.error('SharedData parse hatası:', e);
      }
    }

    // Pattern 2: window.__additionalDataLoaded
    if (!userData) {
      const additionalDataMatch = html.match(/window\.__additionalDataLoaded\([^,]+,\s*({.+?})\);/);
      if (additionalDataMatch) {
        try {
          const additionalData = JSON.parse(additionalDataMatch[1]);
          if (additionalData?.graphql?.user) {
            userData = additionalData.graphql.user;
            posts = userData.edge_owner_to_timeline_media?.edges || [];
          }
        } catch (e) {
          console.error('AdditionalData parse hatası:', e);
        }
      }
    }

    // Pattern 3: JSON-LD structured data
    if (!userData) {
      const jsonLdMatches = html.match(/<script type="application\/ld\+json">(.+?)<\/script>/gs);
      if (jsonLdMatches) {
        for (const match of jsonLdMatches) {
          try {
            const jsonData = JSON.parse(match.replace(/<script[^>]*>|<\/script>/g, ''));
            // JSON-LD'den kullanıcı bilgilerini çıkar
          } catch (e) {
            // Devam et
          }
        }
      }
    }

    // Pattern 4: Instagram'ın yeni GraphQL endpoint'ini dene
    if (!userData) {
      try {
        const graphqlResponse = await fetch(
          `https://www.instagram.com/api/v1/users/web_profile_info/?username=${username}`,
          {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              'Accept': 'application/json',
              'Accept-Language': 'tr-TR,tr;q=0.9,en-US;q=0.8',
              'X-Requested-With': 'XMLHttpRequest',
              'Referer': `https://www.instagram.com/${username}/`,
              'Origin': 'https://www.instagram.com',
            },
          }
        );
        
        if (graphqlResponse.ok) {
          const graphqlData = await graphqlResponse.json();
          if (graphqlData?.data?.user) {
            userData = graphqlData.data.user;
            posts = userData.edge_owner_to_timeline_media?.edges || [];
          }
        }
      } catch (e) {
        console.error('GraphQL endpoint hatası:', e);
      }
    }

    // Pattern 5: HTML'den direkt olarak takipçi ve gönderi sayılarını çıkar
    if (!userData || !userData.edge_followed_by || !userData.edge_followed_by.count) {
      // Instagram'da sayılar genellikle şu formatta: "1,722" veya "1.722" veya "1.7K"
      // HTML'de farklı yerlerde bulunabilir
      
      // Yöntem 1: "followers" veya "takipçi" kelimesiyle birlikte
      const followersPatterns = [
        /(\d+(?:[.,]\d+)?)\s*(?:K|M|B)?\s*(?:takipçi|followers?)/gi,
        /(?:followers?|takipçi)[^>]*>(\d+(?:[.,]\d+)?)/gi,
        /"edge_followed_by":\s*\{[^}]*"count":\s*(\d+)/gi,
        /"follower_count":\s*(\d+)/gi,
      ];
      
      // Yöntem 2: "posts" veya "gönderi" kelimesiyle birlikte
      const postsPatterns = [
        /(\d+(?:[.,]\d+)?)\s*(?:gönderi|posts?)/gi,
        /(?:posts?|gönderi)[^>]*>(\d+(?:[.,]\d+)?)/gi,
        /"edge_owner_to_timeline_media":\s*\{[^}]*"count":\s*(\d+)/gi,
        /"media_count":\s*(\d+)/gi,
      ];
      
      let followers = 0;
      let postCount = 0;
      
      // Takipçi sayısını bul
      for (const pattern of followersPatterns) {
        const match = html.match(pattern);
        if (match) {
          const numStr = match[1]?.replace(/[.,]/g, '') || match[1];
          if (numStr) {
            let num = parseInt(numStr);
            // K, M, B kontrolü
            if (match[0].includes('K') || match[0].includes('k')) {
              num = num * 1000;
            } else if (match[0].includes('M') || match[0].includes('m')) {
              num = num * 1000000;
            }
            if (num > followers) {
              followers = num;
            }
          }
        }
      }
      
      // Gönderi sayısını bul
      for (const pattern of postsPatterns) {
        const match = html.match(pattern);
        if (match) {
          const numStr = match[1]?.replace(/[.,]/g, '') || match[1];
          if (numStr) {
            const num = parseInt(numStr);
            if (num > postCount) {
              postCount = num;
            }
          }
        }
      }
      
      if (followers > 0 || postCount > 0) {
        // Profil görselini de çekmeye çalış
        const profilePicMatch = html.match(/profile_pic_url_hd["']:\s*["']([^"']+)["']/) || 
                                 html.match(/profile_pic_url["']:\s*["']([^"']+)["']/) ||
                                 html.match(/profile_pic_url":\s*"([^"]+)"/);
        
        if (!userData) {
          userData = {
            username: username,
            edge_followed_by: { count: followers },
            edge_owner_to_timeline_media: { count: postCount },
            profile_pic_url: profilePicMatch ? profilePicMatch[1] : '',
            profile_pic_url_hd: profilePicMatch ? profilePicMatch[1] : '',
          };
        } else {
          // Mevcut userData'yı güncelle
          if (followers > 0) {
            userData.edge_followed_by = { count: followers };
          }
          if (postCount > 0) {
            userData.edge_owner_to_timeline_media = { count: postCount };
          }
        }
      }
    }

    // Pattern 6: HTML meta tag'lerinden çek
    if (!userData || !userData.edge_followed_by) {
      const metaFollowers = html.match(/content=["']([^"']*?(\d+(?:[.,]\d+)?)[^"']*?takipçi)/i);
      const metaPosts = html.match(/content=["']([^"']*?(\d+(?:[.,]\d+)?)[^"']*?gönderi)/i);
      
      if (metaFollowers || metaPosts) {
        const followers = metaFollowers 
          ? parseInt(metaFollowers[2].replace(/[.,]/g, '')) 
          : (userData?.edge_followed_by?.count || 0);
        const posts = metaPosts 
          ? parseInt(metaPosts[2].replace(/[.,]/g, '')) 
          : (userData?.edge_owner_to_timeline_media?.count || 0);
        
        if (followers > 0 || posts > 0) {
          userData = {
            username: username,
            edge_followed_by: { count: followers },
            edge_owner_to_timeline_media: { count: posts },
            profile_pic_url: userData?.profile_pic_url || '',
            profile_pic_url_hd: userData?.profile_pic_url_hd || '',
          };
        }
      }
    }

    // Profil bilgileri varsa döndür (görseller olmasa bile)
    if (userData) {
      const media = posts.length > 0 
        ? posts.slice(0, 3).map((edge: any) => {
            const node = edge.node;
            return {
              id: node.id || node.shortcode,
              imageUrl: node.display_url || node.thumbnail_src || node.thumbnail_url || '',
              permalink: `https://instagram.com/p/${node.shortcode}/`,
              isReel: node.__typename === 'GraphVideo' || node.is_video || false,
            };
          }).filter(m => m.imageUrl)
        : [];

      return NextResponse.json({
        profile: {
          username: userData.username || username,
          followers: userData.edge_followed_by?.count || 0,
          posts: userData.edge_owner_to_timeline_media?.count || 0,
          profileImage: userData.profile_pic_url_hd || userData.profile_pic_url || '',
        },
        media,
      });
    }

    // Eğer hiçbir yöntem çalışmazsa hata döndür
    throw new Error('Instagram verileri parse edilemedi');
    
  } catch (error: any) {
    console.error('Instagram fetch hatası:', error);
    return NextResponse.json(
      {
        profile: {
          username: 'izkaokculuk',
          followers: 0,
          posts: 0,
          profileImage: '',
        },
        media: [],
        error: error?.message || 'Instagram verileri çekilemedi',
      },
      { status: 500 }
    );
  }
}

