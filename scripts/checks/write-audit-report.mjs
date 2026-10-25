import fs from 'node:fs/promises';
const a=JSON.parse(await fs.readFile('content/seo-audit-v4.json','utf8'));
let payload='';try{const before=(await fs.stat('/workspace/scratch/26fe13366b66/v4-before-payload.html')).size;const after=(await fs.stat('/workspace/scratch/26fe13366b66/v4-home-snapshot.html')).size;payload=`Ana sayfanın sıkıştırılmamış HTML ve hydration veri çıktısı aynı izole Worker kontrolünde ${before.toLocaleString('tr-TR')} bayttan ${after.toLocaleString('tr-TR')} bayta indi. Bu bir aktarım büyüklüğü karşılaştırmasıdır; LCP veya INP puanı değildir.`;}catch{}
await fs.mkdir('docs',{recursive:true});
const report=`# Ercan Kocakoç web sitesi: tasarım ve SEO denetimi

Tarih: 24 Ekim 2026. Kapsam: güncellenen Sites projesi. Mevcut www.ercankocakoc.com kurulumu ve DNS kayıtları değiştirilmedi.

## Genel sonuç

Tasarım, içerik yapısı ve uygulama içi teknik SEO düzeltmeleri tamamlandı. ${a.routes} Türkçe ve İngilizce URL üretim derlemesinin izole Worker ortamında denetlendi. Proje hâlâ sahibiyle sınırlı özel erişimde. Bu nedenle Google taraması, gerçek indekslenme, Search Console mülkiyeti ve gerçek kullanıcı Core Web Vitals başarısı tamamlanmış olarak gösterilmedi.

## Kontrol listesi

| Kontrol | Durum ve kanıt |
| --- | --- |
| Logo ve kitap arka planı | Şeffaf alfa içeren PNG üretildi ve web için WebP sürümleri kullanıldı. Üst menü ve alt bilgideki beyaz logo kutusu kaldırıldı; kitap görseli ayrı bir nesne olarak sunuldu. Orijinal dosyalar saklandı. |
| Menü ve hero | Masaüstü menü yazısı 15 px; orta genişlikte 14 px; açılan mobil menü 16 px. Portre masaüstünde 490 px, büyük ekranlarda 480 px, mobilde 330 px ile sınırlandı. |
| Mobil ve tablet | 390 ve 768 px genişlikte statik HTML/CSS görsel kontrolü yapıldı. İç belge genişlikleri 375 ve 753 px, kaydırma genişlikleri de aynıydı; yatay taşma gözlenmedi. Masaüstünde canlı React arayüzü ve iletişim pencereleri kontrol edildi. Bunlar fiziksel cihaz veya Lighthouse performans testinin karşılığı değildir. |
| Yazı görselleri | 27 yazı ve tıbbi bilgilendirme sayfasının tamamına kapak ve alternatif metin atandı. Mevcut özgün klinik fotoğrafları kullanıldı. Ek stok görsel gerekmedi. |
| İçerik korunması | Önceki 33 sayfa saklandı. Türkçe ve İngilizce gövde paragrafları önceki sürümle karşılaştırıldı; silinmedi veya kısaltılmadı. Başlıkların yazımı ve düzeyi, bölüm sınırları ve sunum değişti. |
| H1–H4 | Her URL'de tek H1 var. Ara başlıklar anlamsal sırada; gerektiğinde H3 ve H4 desteği var. Kısa yazılara gereksiz alt düzey zorlanmadı. Hiyerarşi atlaması bulunmadı. |
| Title ve meta açıklaması | Tüm sayfalarda mevcut. Tıbbi konu ve okurun aradığı sorularla uyumlu, sayfaya özgü başlıklar düzenlendi. Türkçe ve İngilizce SEO alanları panelde ayrı düzenlenebilir. |
| Canonical ve URL | Her URL'nin canonical değeri yapılandırılmış site adresiyle eşleşti. Önceden kullanılan İngilizce ve bazı eski Türkçe adresler 308 ile karşılıklarına yönleniyor. |
| İç bağlantılar | Üretilen sayfalarda kırık uygulama içi bağlantı bulunmadı. Rehberlerden ilgili özgün hekim yazılarına bağlantılar eklendi. |
| İlk HTML'de içerik | Ana metinler sunucu çıktısında mevcut; yalnızca JavaScript çalıştıktan sonra üretilmiyor. Bu test Googlebot erişiminin veya indekslenmenin doğrulaması değildir. |
| Sitemap | 82 yayımlanmış dil URL'si; karşılıklı tr/en/x-default eşleştirmeleri ve kayıtlı düzenleme tarihleri var. Taslaklar hariç. |
| Robots ve noindex | Özel önizlemede bilinçli olarak kapalı. İzole testte indeksleme ayarı açıldığında index/follow, gerekli yollar için Allow, admin ve API engelleri ve sitemap bildirimi üretildiği doğrulandı. Canlı gizlilik ayarı değiştirilmedi. |
| HTTPS | Yayımlanan Sites adresi HTTPS. Asıl alan adına geçiş ve DNS bu çalışmada yapılmadı. |
| Yazar ve kaynak | Özgün hekim arşivi ile sonradan hazırlanmış editöryal rehberler ayrıldı. Hekim profili, kaynak bağlantıları ve ilgili akademik arşiv erişilebilir. Tıbbi gözden geçirme yapıldığı iddia edilmedi. |
| Yapılandırılmış veri | Person, WebSite, ProfilePage, MedicalWebPage, Article/BlogPosting ve BreadcrumbList kayıtları uygun sayfalarda oluşturuluyor; JSON çıktıları ayrıştırma kontrolünü geçti. Google rich result uygunluğu ayrıca doğrulanmadı. |
| İki dil | Ayrı Türkçe ve /en URL'leri, html lang, canonical ve karşılıklı hreflang kontrol edildi. Klinik çeviriler için uzman onayı verilmiş sayılmıyor. |
| Görsel aktarımı | 17 yüklenen fotoğraf için 480/800/1200 px olmak üzere 51 WebP sürümü üretildi. 800 px sürümlerin toplamı 1.092.130 bayt; özgün JPEG'ler toplamı 4.632.613 bayt. Kaynaklar korunuyor. |
| Yükleme düzeni | Uygun görsellere ölçü bilgisi, kapaklara srcset/sizes ve ekran altı görsellere lazy loading uygulandı. Harici font isteği kaldırıldı. |
| React veri aktarımı | İnteraktif yazı listesine ve uzmanlık sekmelerine tüm makale gövdeleri yerine ihtiyaç duydukları alanlar gönderiliyor. ${payload} |
| Search Console | Panelde doğrulama kodu alanı ve sitemap/robots bağlantıları hazır. Mülkiyet doğrulaması, sitemap gönderimi, URL Inspection ve performans raporlarına bu çalışmada erişilmedi. |
| Core Web Vitals | Gerçek kullanıcı LCP, INP, CLS verisi ve p75 sonucu yok. Sayısal bir başarı puanı verilmedi. Herkese açık son alan adı üzerinde PageSpeed Insights/Search Console/CrUX ile kontrol gerekiyor. |

## Yayından sonra tamamlanacaklar

1. Nihai adresi ve herkese açık yayın erişimini belirleyin. Özel sürümün indeksleme ayarını açmak erişim kilidini kaldırmaz.
2. Kendi alan adı bağlandıktan sonra panelde site adresini güncelleyin; canonical, sitemap ve dil adreslerini tekrar kontrol edin.
3. Search Console'da alan adı veya URL mülkiyetini doğrulayın. Gerekli doğrulama kaydı, bu hesaba özgü Google koduyla yapılmalı.
4. Nihai alan adının sitemap.xml adresini gönderin; önemli URL'lerde canlı URL incelemesini yapın.
5. Core Web Vitals ve indekslenme verileri oluştukça mobil/masaüstü p75 sonuçlarını ve arama sorgularını kontrol edin.
6. Kaynak arşivdeki tıbbi içerik, eski sayısal bilgiler ve çeviriler için hekim değerlendirmesi yapın. Bu çalışmada özgün metni korumak esas alındı.

## Doğrulama yöntemi

- TypeScript derleme kontrolü.
- Üretim Worker derlemesi.
- İzole D1/R2 ortamında CMS yetkileri, kayıt/geri okuma, geçmiş, taslaklar, arşiv ve dosya yükleme kontrolleri.
- 82 URL'de HTML, metin, başlık hiyerarşisi, meta veriler, dil etiketleri, canonical, görseller ve iç bağlantılar.
- İzole ortamda indeksleme ayarı ve Search Console meta doğrulama kodunun üretimi.
- Yeni İngilizce SEO alanları ve kapak seçiminin CMS kaydında korunması.
- Masaüstü canlı arayüz; mobil/tablet statik görsel yerleşim.

Ayrıntılı URL bazlı sonuçlar: content/seo-audit-v4.json. Paragraf koruma karşılaştırması: content/pre-seo-v4-pages.json ve scripts/checks/verify-content.mjs.

## Görsel düzenleme kaydı

Yerleşik görsel düzenleme aracı kullanıldı. PNG kaynakları: public/images/brand/ercan-kocakoc-transparent.png ve public/images/edited/abdominal-radyoloji-book.png. Sitede bunların WebP sürümleri kullanılıyor.

Logo istemi: “Remove ONLY the white background, including white spaces inside the mark and letter counters, making those background areas genuinely transparent. Preserve the blue and black symbol and ALL typography: Prof. Dr. Ercan Kocakoç and GİRİŞİMSEL RADYOLOG. No redesign, no relettering, no new shapes, no shadows or glow.”

Kitap istemi: “Extract ONLY the large three-dimensional book on the left, with its spine and front cover, as a clean cutout on a genuinely transparent background. Preserve the book's shape, perspective, cover imagery, purple/black colors and typography including ABDOMİNAL RADYOLOJİ and Prof. Dr. Ercan Kocakoç. Remove white background, red decorative corner ribbons, separate right-side cover panels and the separate editor caption below.”

## Başvurulan birincil rehberler

- https://developers.google.com/search/docs/appearance/title-link
- https://developers.google.com/search/docs/fundamentals/get-started-developers
- https://developers.google.com/search/docs/crawling-indexing/block-indexing
- https://developers.google.com/search/docs/appearance/snippet
- https://developers.google.com/search/docs/specialty/international/localized-versions
- https://web.dev/articles/vitals

Başlık düzenlemesi Google'da belirli bir sıra veya belirli bir sonuç başlığı garantisi değildir. Sitemap göndermek de indekslenme garantisi değildir.
`;
await fs.writeFile('docs/SEO-tasarim-denetimi-2026-10-24.md',report);console.log('Saved detailed design and SEO audit report.');
