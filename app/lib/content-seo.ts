import type {PageRecord,VideoRecord} from './types';

type LocalisedTitle={tr:string;en:string;seoTr?:string;seoEn?:string};

const pageTitles:Record<string,LocalisedTitle>={
 'biyopsi/prostat-fuzyon-biyopsi':{tr:'Prostat Füzyon Biyopsisi Nedir, Nasıl Yapılır?',en:'What Is MRI-Ultrasound Fusion Prostate Biopsy?',seoTr:'Prostat Füzyon Biyopsisi: İşlem ve Hazırlık',seoEn:'MRI-Ultrasound Fusion Prostate Biopsy'},
 'biyopsi/pankreas-biyopsi':{tr:'Pankreas Biyopsisi Nedir, Nasıl Yapılır?',en:'What Is a Pancreatic Biopsy and How Is It Performed?'},
 'biyopsi/meme-biyopsi':{tr:'Meme Biyopsisi Nedir, Nasıl Yapılır?',en:'What Is a Breast Biopsy and How Is It Performed?'},
 'biyopsi/lenf-bezi-biyopsi':{tr:'Lenf Bezi Biyopsisi Nedir, Nasıl Yapılır?',en:'What Is a Lymph Node Biopsy and How Is It Performed?'},
 'biyopsi/tiroid-biyopsi':{tr:'Tiroid Biyopsisi Nedir, Nasıl Yapılır?',en:'What Is a Thyroid Biopsy and How Is It Performed?'},
 'biyopsi/kemik-biyopsi':{tr:'Kemik Biyopsisi Nedir, Nasıl Yapılır?',en:'What Is a Bone Biopsy and How Is It Performed?'},
 'biyopsi/akciger-biyopsi':{tr:'Akciğer Biyopsisi Nedir, Nasıl Yapılır?',en:'What Is a Lung Biopsy and How Is It Performed?'},
 'biyopsi/yumusak-doku-biyopsi':{tr:'Yumuşak Doku Biyopsisi Nedir? İşlem ve Hazırlık',en:'What Is a Soft Tissue Biopsy? Procedure and Preparation',seoTr:'Yumuşak Doku Biyopsisi: İşlem ve Hazırlık',seoEn:'Soft Tissue Biopsy: Procedure and Preparation'},
 'biyopsi/karaciger-biyopsi':{tr:'Karaciğer Biyopsisi Nedir? İşlem, Hazırlık ve Takip',en:'What Is a Liver Biopsy? Procedure, Preparation and Follow-up',seoTr:'Karaciğer Biyopsisi: Hazırlık ve İşlem',seoEn:'Liver Biopsy: Preparation and Procedure'},
 'tedaviler/karaciger-tumor-ablasyon-tedavisi':{tr:'Karaciğer Tümör Ablasyonu Nedir? RF ve Mikrodalga',en:'What Is Liver Tumour Ablation? RF and Microwave Treatment',seoTr:'Karaciğer Tümör Ablasyonu: RF ve Mikrodalga',seoEn:'Liver Tumour Ablation: RF and Microwave'},
 'tedaviler/kemoembolizasyon':{tr:'Kemoembolizasyon (TAKE) Nedir, Nasıl Uygulanır?',en:'What Is Transarterial Chemoembolisation (TACE)?',seoTr:'Kemoembolizasyon (TAKE): Uygulama ve Süreç',seoEn:'Transarterial Chemoembolisation (TACE)'},
 'tedaviler/diger-bolgelerdeki-tumor-embolizasyonu':{tr:'Miyom Embolizasyonu ve Diğer Tümör Embolizasyonları',en:'Fibroid Embolisation and Embolisation of Other Tumours',seoTr:'Miyom ve Tümör Embolizasyonu Tedavisi',seoEn:'Fibroid and Tumour Embolisation Treatment'},
 'tedaviler/radyoembolizasyon-tedavisi':{tr:'Radyoembolizasyon (TARE) Tedavisi Nedir?',en:'What Is Transarterial Radioembolisation (TARE)?',seoTr:'Radyoembolizasyon (TARE) Tedavisi',seoEn:'Transarterial Radioembolisation (TARE)'},
 'tedaviler/perkutan-kolesistostomi':{tr:'Perkütan Kolesistostomi Nedir? Safra Kesesi Drenajı',en:'What Is Percutaneous Cholecystostomy? Gallbladder Drainage',seoTr:'Perkütan Kolesistostomi: Safra Kesesi Drenajı',seoEn:'Percutaneous Cholecystostomy: Gallbladder Drainage'},
 'ultrason-girisimsel-radyoloji/gebelik-ultrasonu':{tr:'Gebelik Ultrasonu Ne Zaman ve Nasıl Yapılır?',en:'When and How Is a Pregnancy Ultrasound Performed?',seoTr:'Gebelik Ultrasonu: Zamanlama ve Uygulama',seoEn:'Pregnancy Ultrasound: Timing and Examination'},
 'ultrason-girisimsel-radyoloji/karaciger-ultrasonu':{tr:'Karaciğer Ultrasonu Neyi Gösterir? Hazırlık ve Uygulama',en:'What Does a Liver Ultrasound Show? Preparation and Examination',seoTr:'Karaciğer Ultrasonu: Hazırlık ve Bulgular',seoEn:'Liver Ultrasound: Preparation and Findings'},
 'ultrason-girisimsel-radyoloji/meme-ultrasonu':{tr:'Meme Ultrasonu Ne Zaman ve Nasıl Yapılır?',en:'When and How Is a Breast Ultrasound Performed?',seoTr:'Meme Ultrasonu: Kullanım Alanları ve Uygulama',seoEn:'Breast Ultrasound: Uses and Examination'},
 'ultrason-girisimsel-radyoloji/karin-ultrasonu':{tr:'Karın Ultrasonu Nedir? Hazırlık ve İnceleme Süreci',en:'What Is an Abdominal Ultrasound? Preparation and Examination',seoTr:'Karın Ultrasonu: Hazırlık ve İnceleme',seoEn:'Abdominal Ultrasound: Preparation and Examination'},
 'ultrason-girisimsel-radyoloji/tiroid-ultrasonu':{tr:'Tiroid Ultrasonu Nedir? Nodül Değerlendirmesi',en:'What Is a Thyroid Ultrasound? Nodule Assessment',seoTr:'Tiroid Ultrasonu: Nodül Değerlendirmesi',seoEn:'Thyroid Ultrasound: Nodule Assessment'},
 'ultrason-girisimsel-radyoloji/uriner-sistem-ve-urogenital-ultrason':{tr:'Üriner ve Ürogenital Ultrason: Hangi Organlar İncelenir?',en:'Urinary and Genitourinary Ultrasound: Organs Examined',seoTr:'Üriner ve Ürogenital Ultrason İncelemesi',seoEn:'Urinary and Genitourinary Ultrasound'},
 '2-uzman-gorusu/abdomen-karin-bolgesi-tanisal-2-gorus':{tr:'Radyolojide İkinci Görüş Nedir? Ne Zaman Alınır?',en:'What Is a Radiology Second Opinion and When Is It Needed?',seoTr:'Radyolojide İkinci Görüş: Ne Zaman Alınır?',seoEn:'Radiology Second Opinion: When Is It Needed?'},
 '2-uzman-gorusu/karin-bolgesi-radyolojisi':{tr:'Abdominal Radyoloji Nedir? Karın Bölgesi Görüntüleme',en:'What Is Abdominal Radiology? Imaging the Abdomen',seoTr:'Abdominal Radyoloji ve Karın Görüntüleme',seoEn:'Abdominal Radiology and Imaging'},
 '2-uzman-gorusu/bobrek-ve-ureme-sistemi':{tr:'Genitoüriner Radyoloji: Böbrek ve Üreme Sistemi',en:'Genitourinary Radiology: Kidney and Reproductive System',seoTr:'Genitoüriner Radyoloji ve Ürogenital Görüntüleme',seoEn:'Genitourinary Radiology and Imaging'},
 'blog/prostat-fuzyon-biyopsi-nedir':{tr:'Prostat Füzyon Biyopsisi: MR ve Ultrason Nasıl Birleşir?',en:'Prostate Fusion Biopsy: How MRI and Ultrasound Work Together',seoTr:'Prostat Füzyon Biyopsisi: MR ve Ultrason',seoEn:'Prostate Fusion Biopsy: MRI and Ultrasound'},
 'blog/biyopsi-oncesi-hangi-sorulari-sormalisiniz':{tr:'Biyopsi Öncesi Hazırlık: Hekime Sorulacak 5 Soru',en:'Preparing for a Biopsy: Five Questions for Your Physician',seoTr:'Biyopsi Öncesi Hazırlık: Sorulacak 5 Soru',seoEn:'Biopsy Preparation: Five Questions to Ask'},
 'blog/ultrason-randevusuna-hazirlik':{tr:'Ultrason Öncesi Hazırlık: Her İncelemede Aynı mı?',en:'Ultrasound Preparation: Is It the Same for Every Examination?',seoTr:'Ultrason Öncesi Hazırlık Rehberi',seoEn:'Ultrasound Preparation Guide'},
 'blog/ikinci-gorus-icin-goruntuler':{tr:'Radyolojik İkinci Görüş İçin Gerekli Görüntü ve Raporlar',en:'Images and Reports Needed for a Radiology Second Opinion',seoTr:'İkinci Görüş İçin Görüntü ve Rapor Hazırlığı',seoEn:'Preparing Images and Reports for a Second Opinion'}
};

const trSuffix:Record<string,string>={
 biyopsi:' İşlemin amacı, görüntüleme rehberliği, hazırlık ve işlem sonrası takip hakkında genel bilgi edinin.',
 tedaviler:' Yöntemin amacı, uygulanışı, hasta seçimi ve işlem sonrası süreç hakkında genel bilgi edinin.',
 'ultrason-girisimsel-radyoloji':' İncelemenin amacı, hazırlık gereksinimleri, uygulama süreci ve değerlendirilen yapılar hakkında bilgi edinin.',
 '2-uzman-gorusu':' Değerlendirmenin kapsamı, gerekli görüntü ve raporlar ile görüşme hazırlığı hakkında genel bilgi edinin.',
 blog:' İçeriğin kapsamını, görüşme öncesi hazırlığı ve hekiminizle konuşmanız gereken başlıkları inceleyin.'
};
const enSuffix:Record<string,string>={
 biyopsi:' Learn about its purpose, image guidance, preparation and follow-up after the procedure.',
 tedaviler:' Learn about its purpose, how it is performed, patient selection and follow-up.',
 'ultrason-girisimsel-radyoloji':' Learn about its purpose, preparation, examination process and the structures assessed.',
 '2-uzman-gorusu':' Learn what the review covers and which images, reports and records to prepare.',
 blog:' Review the scope of the topic, practical preparation and questions to discuss with your physician.'
};
const trShort:Record<string,string[]>={
 biyopsi:[' Hazırlık, işlem ve takip süreci hakkında bilgi edinin.',' Hazırlık ve takip sürecini öğrenin.'],
 tedaviler:[' Uygulama, hasta seçimi ve takip sürecini inceleyin.',' Uygulama ve takip sürecini inceleyin.'],
 'ultrason-girisimsel-radyoloji':[' Hazırlık, uygulama süreci ve değerlendirilen yapılar hakkında ayrıntılı bilgi edinin.',' Hazırlık ve inceleme süreci hakkında bilgi edinin.',' Hazırlık ve inceleme sürecini öğrenin.'],
 '2-uzman-gorusu':[' Gerekli görüntü, rapor ve hazırlık adımlarını öğrenin.',' Gerekli görüntü ve raporları öğrenin.'],
 blog:[' Hazırlık adımlarını ve hekiminize soracağınız soruları inceleyin.',' Hazırlık adımlarını ve soruları inceleyin.']
};
const enShort:Record<string,string[]>={
 biyopsi:[' Learn about preparation, the procedure and follow-up.',' Learn about preparation and follow-up.'],
 tedaviler:[' Review how it is performed, patient selection and follow-up.',' Review the procedure and follow-up.'],
 'ultrason-girisimsel-radyoloji':[' Learn about preparation and the examination process.',' Learn how to prepare for the examination.'],
 '2-uzman-gorusu':[' Learn which images, reports and records to prepare.',' Learn which images and reports to prepare.'],
 blog:[' Review practical preparation and questions for your physician.',' Review the preparation steps and questions.']
};

function description(summary:string,category:string,kind:string,en=false){
 const clean=summary.trim().replace(/\s+/g,' ');if(clean.length>=120&&clean.length<=160)return clean;
 const key=kind==='blog'?'blog':category;const candidates=[(en?enSuffix:trSuffix)[key],...((en?enShort:trShort)[key]||[])].filter(Boolean);
 const fit=candidates.map(s=>clean+s).find(s=>s.length>=120&&s.length<=160);if(fit)return fit;
 return clean.length>160?clean.slice(0,157).replace(/[,:;\s]+$/,'')+'…':clean;
}

export function applyPageSeo(page:PageRecord):PageRecord{
 const rule=pageTitles[page.slug];if(!rule||!['article','blog'].includes(page.kind))return page;
 if(page.updatedAt.includes('T'))return page;
 const title=rule.tr,titleEn=rule.en;
 return {...page,title,titleEn,seoTitle:(rule.seoTr||title)+' | Ercan Kocakoç',seoTitleEn:(rule.seoEn||titleEn)+' | Ercan Kocakoç',seoDescription:description(page.summary,page.category,page.kind),seoDescriptionEn:description(page.summaryEn,page.category,page.kind,true),updatedAt:'2026-10-27'};
}

const videoTitles:Record<string,LocalisedTitle>={
 BV3nDCJdBDY:{tr:'Tümör Ablasyonu Nedir? RF ve Mikrodalga Ablasyon Tedavisi',en:'What Is Tumour Ablation? RF and Microwave Ablation Treatment'},
 'M-rNAfF35W8':{tr:'Miyom Embolizasyonu Nedir? Ameliyatsız Miyom Tedavisi',en:'What Is Uterine Fibroid Embolization? Non-Surgical Treatment'},
 'snUnd3uf-mI':{tr:'Radyoloji ve Girişimsel Radyoloji Üzerine Söyleşi',en:'An Interview on Radiology and Interventional Radiology'},
 oukB8wqUnGA:{tr:'TAKE Nedir? Transarteriyel Kemoembolizasyon Nasıl Yapılır?',en:'What Is TACE? How Is Transarterial Chemoembolization Performed?'},
 XcmZVLOTQIs:{tr:'Girişimsel Radyoloji Nedir? Hangi Durumlarda Kullanılır?',en:'What Is Interventional Radiology and When Is It Used?'},
 wWxUEdUHtcE:{tr:'Kapalı Miyom Tedavisi Nasıl Yapılır? Miyom Embolizasyonu',en:'How Is Non-Surgical Fibroid Treatment Performed?'},
 z1Qntrc_4ac:{tr:'Prostat Füzyon Biyopsisi Nedir? Nasıl Yapılır?',en:'What Is MRI-Ultrasound Fusion Prostate Biopsy?'},
 ThwQSg278X0:{tr:'Biyopsi Nedir? Nasıl Yapılır ve Neden İstenir?',en:'What Is a Biopsy? How Is It Performed and Why Is It Needed?'},
 BDPGDgOGalg:{tr:'Akciğer Biyopsisi Nedir? Nasıl Yapılır?',en:'What Is a Lung Biopsy and How Is It Performed?'},
 ivrXSzDNpVk:{tr:'Lenf Nodu Biyopsisi Nedir? Nasıl Yapılır?',en:'What Is a Lymph Node Biopsy and How Is It Performed?'},
 UvUPTOXD1uQ:{tr:'Tiroid Biyopsisi Nedir? Nasıl Yapılır?',en:'What Is a Thyroid Biopsy and How Is It Performed?'},
 'rG-F8sV4U3E':{tr:'Mikrodalga Ablasyon Nedir? Tümör Tedavisinde Kullanımı',en:'What Is Microwave Ablation? Its Use in Tumour Treatment'},
 b3LKpmqd9zA:{tr:'Kadınlarda ve Erkeklerde Görülen Kanser Türleri',en:'Common Cancer Types in Women and Men'},
 CMmy3SpZ_W4:{tr:'Karaciğer Tümörlerinde TAKE ve TARE Tedavileri',en:'TACE and TARE Treatments for Liver Tumours'},
 jG9wz33S_ak:{tr:'RF Ablasyon Nedir? Radyofrekans Ablasyon Tedavisi',en:'What Is RF Ablation? Radiofrequency Ablation Treatment'}
};

export function applyVideoSeo(video:VideoRecord):VideoRecord{
 const rule=videoTitles[video.id];if(!rule)return video;
 if(video.sourceTitle&&video.title!==rule.tr)return video;
 const channel=video.description.split('·')[0].trim();
 return {...video,sourceTitle:video.sourceTitle||video.title,sourceTitleEn:video.sourceTitleEn||video.titleEn,title:rule.tr,titleEn:rule.en,description:`${rule.tr} konusunda Prof. Dr. Ercan Kocakoç'un bilgilendirme videosu. Kaynak: ${channel}.`};
}
