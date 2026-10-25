# Renk, stil ve video kapağı denetimi

Kullanıcının paylaştığı ekran görüntüsündeki ultrason kartlarının soluk mor, gri ve yeşil tonları ana sitenin mavi rengiyle tutarlı değildi. Önceki kapak serisi de farklı bir adaçayı paleti kullanıyordu.

## Düzenlemeler

- Ana renk mevcut site mavisi `#247397`, metin/zemin ankrajı `#173849` olarak korundu. Petrol `#1e7686`, yeşil `#286e60` ve mavi `#3d6093` kontrollü bölüm vurguları olarak tanımlandı.
- Ultrasonun altı kartı aynı renk ailesine alındı. Kategori kartları, sayfa başlıkları, akademik kutular, bağlantılar ve çağrı alanları bu palete bağlandı.
- 27 yazı kapağının geometrisi ve ortak çizgi stili korunarak renkleri mavi ailesine taşındı.
- 15 video için 1280×720 JPEG kapaklar ve düzenlenebilir SVG kaynaklar üretildi. Kapak başlıkları video konularını özetler; arşivdeki tam başlıklar ve YouTube bağlantıları değiştirilmedi.
- Video kartları 16:9 oranına alındı. Oynatma simgesi kapak başlığını kapatmaması için sağ alta taşındı. Özgün YouTube küçük resimleri yedek olarak korundu.
- Ana sitedeki Georgia/Arial sistemi korundu. Kurum logolarının özgün renkleri değiştirilmedi.

## Kontroller

`scripts/checks/audit-visual-v7.mjs` 15 kapak benzersizliğini, kaynak videoların korunmasını ve düz renkli kartlardaki beyaz metin kontrastını kontrol eder. Sonuçlar `content/color-style-audit-v7.json` dosyasındadır. Bu rapor tüm site için erişilebilirlik sertifikası veya gerçek kullanıcı performans ölçümü değildir.

Video kapakları web sitesindeki galeri ve ana sayfa için eklenmiştir. YouTube kanallarındaki yayınların küçük resimleri değiştirilmemiştir. JPEG dosyaları, kanal sahibi tarafından YouTube'da kullanılabilecek 1280×720 boyutundadır.

Tarayıcı kontrolü: altı ultrason kartının hesaplanan renkleri yeni paletle eşleşti. Video kapakları aynı üst hizada. İlk kapak doğru YouTube kimliğiyle pencere açıyor ve kapatılıyor. 390 px ana sayfa/video ve 768 px ana sayfa statik yerleşimlerinde belge genişliği içerik genişliğine eşit; yatay taşma görülmedi. TypeScript, üretim derlemesi, CMS/D1/R2 ve 82 URL SEO kontrolleri geçti.
