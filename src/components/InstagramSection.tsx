"use client";

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { instagramConfig } from '@/config/instagram';

type InstagramPost = {
  id: string;
  imageUrl: string;
  permalink: string;
  isReel?: boolean;
};

type InstagramData = {
  profile: {
    username: string;
    followers: number;
    posts: number;
    profileImage: string;
  };
  media: InstagramPost[];
};

export function InstagramSection() {
  const [data, setData] = useState<InstagramData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Data yüklendikten sonra animasyon kontrolü yap
    if (!loading && sectionRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
            }
          });
        },
        { threshold: 0.1 }
      );

      // İlk yüklemede görünür alandaysa direkt göster
      const rect = sectionRef.current.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
      if (isInViewport) {
        setIsVisible(true);
      }

      observer.observe(sectionRef.current);

      return () => {
        if (sectionRef.current) {
          observer.unobserve(sectionRef.current);
        }
      };
    } else if (!loading) {
      // Eğer data yüklendiyse ama ref henüz hazır değilse, kısa bir süre bekle
      const timer = setTimeout(() => {
        if (sectionRef.current) {
          setIsVisible(true);
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  useEffect(() => {
    async function fetchInstagramData() {
      try {
        // Instagram'dan veri çekmeyi dene
        const response = await fetch('/api/instagram-posts');
        const result = await response.json();

        // API'den profil bilgileri geldiyse kullan (görseller olmasa bile)
        if (result.profile && (result.profile.followers > 0 || result.profile.posts > 0) && !result.error) {
          setData({
            profile: {
              username: result.profile.username || instagramConfig.username,
              followers: result.profile.followers || instagramConfig.followers,
              posts: result.profile.posts || instagramConfig.posts,
              profileImage: result.profile.profileImage || instagramConfig.profileImage,
            },
            media: result.media && result.media.length > 0 ? result.media : instagramConfig.recentPosts.map((post) => ({
              id: post.id,
              imageUrl: post.imageUrl,
              permalink: post.permalink || `https://instagram.com/${instagramConfig.username}`,
              isReel: post.isReel,
            })),
          });
        } else {
          // API başarısız oldu, config'den kullan
          setData({
            profile: {
              username: instagramConfig.username,
              followers: instagramConfig.followers,
              posts: instagramConfig.posts,
              profileImage: instagramConfig.profileImage,
            },
            media: instagramConfig.recentPosts.map((post) => ({
              id: post.id,
              imageUrl: post.imageUrl,
              permalink: post.permalink || `https://instagram.com/${instagramConfig.username}`,
              isReel: post.isReel,
            })),
          });
        }
      } catch (error) {
        console.error('Instagram verileri çekilemedi, config kullanılıyor:', error);
        // Hata durumunda config'den kullan
        setData({
          profile: {
            username: instagramConfig.username,
            followers: instagramConfig.followers,
            posts: instagramConfig.posts,
            profileImage: instagramConfig.profileImage,
          },
          media: instagramConfig.recentPosts.map((post) => ({
            id: post.id,
            imageUrl: post.imageUrl,
            permalink: post.permalink || `https://instagram.com/${instagramConfig.username}`,
            isReel: post.isReel,
          })),
        });
      } finally {
        setLoading(false);
      }
    }

    fetchInstagramData();
  }, []);

  if (loading) {
    return (
      <section className="bg-izkaBlack py-12">
        <div className="container-px mx-auto">
          <div className="max-w-4xl mx-auto text-center text-white/60">
            Instagram yükleniyor...
          </div>
        </div>
      </section>
    );
  }

  if (!data) {
    return null;
  }

  const { profile, media } = data;

  return (
    <section 
      ref={sectionRef}
      id="galeri" 
      className={`bg-izkaBlack py-12 scroll-mt-16 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
      }`}
    >
      <div className="container-px mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
              <span className="text-izkaYellow">Instagram</span> Galerimiz
            </h2>
          </div>
          
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-white/10">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-izkaYellow to-izkaYellow/80 border-2 border-izkaYellow flex items-center justify-center overflow-hidden flex-shrink-0">
              <img
                src={profile.profileImage}
                alt={profile.username}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/izka.png';
                  e.currentTarget.className = 'w-full h-full object-contain p-2';
                }}
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-1 sm:mb-2">İZKA Okçuluk</h3>
              <p className="text-white/70 text-sm sm:text-base">@{profile.username}</p>
            </div>
            <Link
              href={`https://instagram.com/${profile.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 sm:px-6 py-2 bg-izkaYellow text-black font-semibold rounded-md hover:brightness-95 transition text-sm sm:text-base whitespace-nowrap"
            >
              Profili Görüntüle
            </Link>
          </div>

          {/* Posts Grid */}
          {media.length > 0 && (
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {media.slice(0, 3).map((post) => (
              <Link
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square bg-black/40 rounded-lg overflow-hidden group hover:opacity-80 transition"
              >
                <img
                  src={post.imageUrl}
                  alt={`Instagram post ${post.id}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Görsel yüklenemezse placeholder göster
                    e.currentTarget.src = '/izka.png';
                    e.currentTarget.className = 'w-full h-full object-contain p-4';
                  }}
                />
                {post.isReel && (
                  <div className="absolute top-2 right-2">
                    <svg
                      className="w-6 h-6 text-white drop-shadow-lg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />
              </Link>
            ))}
          </div>
          )}

          {/* Follow Button */}
          <div className="mt-8 text-center">
            <Link
              href={`https://instagram.com/${profile.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white font-semibold rounded-lg hover:brightness-110 transition text-sm sm:text-base"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              Instagram'da Takip Et
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
