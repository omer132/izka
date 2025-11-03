# Instagram Verilerini Manuel Olarak Güncelleme

Instagram bölümü artık API kullanmadan, manuel olarak veri güncelleyebileceğiniz şekilde yapılandırıldı.

## Nasıl Güncelleme Yapılır?

### 1. Config Dosyasını Güncelleyin

`src/config/instagram.ts` dosyasını açın ve şu bilgileri güncelleyin:

```typescript
export const instagramConfig = {
  username: 'izkaokculuk',        // Instagram kullanıcı adınız
  displayName: 'İZKA Okçuluk',    // Görünen isim
  followers: 1722,                 // Takipçi sayısı
  posts: 277,                     // Toplam gönderi sayısı
  profileImage: '/izka.png',      // Profil fotoğrafı
  recentPosts: [                   // Son gönderiler
    // ...
  ],
};
```

### 2. Instagram Görsellerini İndirin

1. Instagram profil sayfanıza gidin
2. Gösterilmek istenen gönderileri açın
3. Her görseli sağ tıklayıp "Görseli Farklı Kaydet" ile indirin
4. Görselleri `public/instagram/` klasörüne kaydedin
5. Dosya adlarını `post-1.jpg`, `post-2.jpg` gibi isimlendirin

### 3. Klasör Yapısı

```
public/
  instagram/
    post-1.jpg
    post-2.jpg
    post-3.jpg
    post-4.jpg
    post-5.jpg
    post-6.jpg
```

### 4. Config Dosyasında Görselleri Tanımlayın

`src/config/instagram.ts` dosyasında `recentPosts` dizisini güncelleyin:

```typescript
recentPosts: [
  {
    id: '1',
    imageUrl: '/instagram/post-1.jpg',
    permalink: 'https://instagram.com/p/ABC123XYZ', // Opsiyonel: Gönderi linki
    isReel: false, // Reels ise true yapın
  },
  {
    id: '2',
    imageUrl: '/instagram/post-2.jpg',
    permalink: 'https://instagram.com/p/DEF456UVW',
    isReel: true,
  },
  // ... diğer gönderiler
],
```

### 5. Verileri Güncellemek İçin

- **Takipçi/Gönderi Sayısı**: Instagram profil sayfanızdan kontrol edip `src/config/instagram.ts` dosyasında güncelleyin
- **Yeni Gönderiler**: Yeni görselleri `public/instagram/` klasörüne ekleyip config dosyasına ekleyin
- **Profil Fotoğrafı**: Yeni profil fotoğrafını `public/` klasörüne koyup config'de `profileImage` yolunu güncelleyin

## Avantajlar

✅ API kurulumu gerekmez  
✅ Token yönetimi yok  
✅ Hızlı ve kolay güncelleme  
✅ Herhangi bir limit yok  
✅ Tam kontrol sizde  

## Notlar

- Görseller JPEG, PNG veya WebP formatında olabilir
- Önerilen görsel boyutu: 1080x1080px (Instagram standart)
- Görseller yoksa otomatik olarak placeholder gösterilir
- `permalink` alanı opsiyoneldir, boş bırakılırsa profil sayfasına yönlendirir

