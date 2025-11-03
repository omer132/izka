// Instagram verilerini buradan manuel olarak güncelleyebilirsiniz
// Instagram profil sayfanızdan görselleri indirip public/instagram klasörüne koyun

export const instagramConfig = {
  username: 'izkaokculuk', // Instagram kullanıcı adınız
  displayName: 'İZKA Okçuluk',
  followers: 1722, // Takipçi sayısı
  posts: 277, // Toplam gönderi sayısı
  profileImage: '/izka.png', // Profil fotoğrafı (public klasöründe)
  
  // Son gönderiler - Instagram'dan görselleri indirip public/instagram klasörüne koyun
  // Her gönderi için: Instagram profil sayfanızdan görseli sağ tıklayıp "Görseli Farklı Kaydet" ile indirin
  recentPosts: [
    {
      id: '1',
      imageUrl: '/indir.png',
      permalink: 'https://instagram.com/izkaokculuk',
      isReel: false,
    },
    {
      id: '2',
      imageUrl: '/izka.png',
      permalink: 'https://instagram.com/izkaokculuk',
      isReel: false,
    },
    {
      id: '3',
      imageUrl: '/WhatsApp Image 2025-11-01 at 13.26.42.jpeg',
      permalink: 'https://instagram.com/izkaokculuk',
      isReel: true,
    },
  ],
};

