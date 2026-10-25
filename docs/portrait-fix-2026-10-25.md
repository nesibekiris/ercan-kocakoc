# Ana sayfa portresi ve çerçeve düzeltmesi

Kullanıcının gönderdiği fotoğrafın arka planı temizlendi. Orijinal yükleme korundu; sayfada alfa kanalı içeren, optimize edilmiş WebP kullanılıyor.

Hero sütunları `minmax(0, …)` ve `min-width:0` ile daralabilir hâle getirildi. Görsel `object-fit:contain` ile çerçevenin içinde kalır; çerçeve taşmayı sınırlar. Sütun genişliği, görsel yüksekliği ve iç boşluklar mobil/tablet/masaüstü için ayrı sınırlandı. Dışarı çıkan dekoratif köşeler kaldırıldı; dikey açıklama çerçeve içine taşındı.

Yönetim panelindeki portre seçimi korunur. Varsayılan görsel şeffaf sürümle güncellendi. Eski kaynak fotoğraf ve kullanıcının orijinal dosyası silinmedi.

Doğrulama: WebP RGBA alfa kanalı ve dört saydam köşe kontrol edildi. Tarayıcıda masaüstü görünümü; 390, 768 ve 1024 px statik yerleşimleri kontrol edildi. Görsel çerçeve içinde, çerçeve ekran içinde kaldı ve yatay taşma görülmedi. TypeScript, içerik koruma ve izole CMS/D1/R2 kontrolleri geçti.
