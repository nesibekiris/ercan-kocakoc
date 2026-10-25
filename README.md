# Prof. Dr. Ercan Kocakoç · Radyoloji

Türkçe / İngilizce, yönetim panelli web sitesi. React, Vinext ve Cloudflare Workers üzerinde sunucuda oluşturulan sayfalar; D1 içerik veritabanı ve R2 medya arşivi kullanır.

**Site:** https://ercan-kocakoc-radyoloji.nesibe.chatgpt.site

Bu depo uygulama kaynak kodunu, yönetim panelini, içerikleri, görselleri, veri şemasını, doğrulama betiklerini ve kaynak/lisans kayıtlarını içerir. Çalışan sitenin erişim politikası depodan bağımsızdır.

## İçerik ve arşiv

- 4 uzmanlık kategorisi, 23 özgün hekim bilgilendirme yazısı ve 4 editöryal hasta rehberi.
- Hakkında: özgeçmiş, 8 eğitim/unvan kaydı, 17 görev kaydı, 5 ödül, idari görevler, editörlük/hakemlik ve 9 meslek kuruluşu.
- 240 bağlantılı yayın, 6 tez, 15 YouTube videosu ve 36 görsel galeri kaydı.
- 75 konferans/seminer ve 7 panel/eğitim kaydı; kaynak metinleri eksiltilmeden yıllara göre sunulur.
- 27 yazı için aynı renk ve çizgi dilinde, konuya özel vektör kapaklar.
- 15 video için 1280×720 JPEG kapaklar ve düzenlenebilir SVG kaynaklar; tam video başlıkları ve bağlantılar korunur.
- Eski sitenin 45 görseli ve kullanıcının yüklediği 17 fotoğraf korunur. Stok görsellerin kaynak ve lisans kayıtları content/licensed-images-v5.json içindedir.

app/lib/seed.ts ilk sayfa içeriklerini, app/lib/archive-seed.ts yayın/tez/video/galeri kayıtlarını içerir. Panelde kaydedilen değerler D1'de saklanır ve başlangıç verilerinin önüne geçer. Akademik katkıların veri kaynağı content/academic-contributions.json, kullanıcının sağladığı eksiksiz metin content/academic-contributions-source.md dosyasıdır. Atıf sayıları özgeçmişte bildirilen tarihsel verilerdir; canlı bibliyometrik ölçüm değildir.

## Yönetim paneli

/admin adresi yapılandırılmış site sahibinin ChatGPT hesabıyla kullanılır. Panel; sayfa/yazı düzenleme, TR/EN başlık ve metinler, taslak/yayın durumu, SEO alanları, kapak ve alternatif metin, görsel yükleme, revizyonlar, video/galeri/yayın/tez arşivi ve genel site ayarlarını destekler.

Yetkilendirme sunucuda CMS_ADMIN_EMAIL veya kayıtlı sahip kimliğiyle yapılır. Bu değerler depoda bulunmaz. CMS_PRIVATE_SETUP=1 yalnızca yeni ve henüz sahip atanmamış özel bir kurulumun ilk girişinde kullanılabilir; herkese açık kurulumda etkinleştirilmemelidir. Yetkili sahip yapılandırılmadığında yazma işlemleri kapalıdır.

## Geliştirme ve kontroller

Gereksinimler: Node.js 22.13 veya üzeri ve package.json içinde belirtilen pnpm sürümü.

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Yerel D1 şeması drizzle/0000_tearful_barracuda.sql dosyasındadır. Vite yerel Cloudflare bağlama yapılandırmasını oluşturur; şema yerel D1'e uygulanmalıdır. vite.config.ts içindeki D1 kimliği yerel yer tutucudur. Gerçek veritabanı ve bucket eşlemesini dağıtım ortamı yapar.

```bash
pnpm build
node node_modules/typescript/bin/tsc --noEmit
node scripts/checks/verify-content.mjs
node scripts/checks/audit-visual-v7.mjs
node scripts/checks/verify-worker.mjs
node scripts/checks/audit-seo.mjs
```

Son iki kontrol derlenmiş Worker'ı izole D1/R2 ile çalıştırır; canlı veriyi değiştirmez. verify-worker kimlik/yetki kontrollerini, CMS kayıt ve geri okumayı, taslakları, revizyonları, arşiv düzenlemeyi ve medya yükleme/okumayı doğrular. SEO denetimi 82 TR/EN adresi tarar.

## Dağıtım

Mevcut yayın Sites altyapısındadır. Proje kimliği ve D1/R2 bağlama adları .openai/hosting.json içinde korunur. Sites, kaynak paketini ve derlenmiş Worker'ı dağıtır; gerçek depolama kimlikleri ve sırlar barındırma ortamında yönetilir. Bu depo GitHub Pages için statik çıktı değildir. Başka bir Workers ortamına taşırken D1/R2 bağlamalarını, kimlik doğrulamayı ve sunucu sırlarını o ortama göre yapılandırmak gerekir.

Ortam dosyaları, özel anahtarlar, yerel veritabanları, bağımlılıklar ve üretilen derlemeler .gitignore ile dışarıda tutulur. Kaynak kodun GitHub'daki kopyası canlı D1/R2 veritabanının yedeği değildir; paneldeki değişiklikleri ayrıca dışa aktarın.

## SEO ve görsel kaynakları

Tek H1, sıralı H2–H4, sunucuda oluşturulan ana metinler, canonical, TR/EN hreflang, sitemap, robots, yapılandırılmış veri, görsel alternatif metinleri ve yönlendirmeler bulunur. Mevcut özel yayında indeksleme bilinçli olarak kapalıdır. Alan adı/DNS değişikliği, Search Console sahiplik doğrulaması veya site haritası gönderimi yapılmamıştır. Gerçek kullanıcı Core Web Vitals verileri ölçülmemiştir.

Özgün kaynaklar ve görsel kullanım kayıtları content/ altında; denetim ve tasarım notları docs/ altındadır. Meslek kuruluşlarının logoları özgeçmişte kurumları tanıtmak için kullanılır; kaynakları content/society-logo-provenance.json içinde kayıtlıdır. Stok fotoğraflar temsili olarak etiketlenir. Yeni kapaklar dekoratif konu piktogramlarıdır; tanısal görüntü veya ölçekli anatomik çizim değildir.
