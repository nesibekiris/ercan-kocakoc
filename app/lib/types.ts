export type FAQ={question:string;answer:string};
export type PageRecord={slug:string;title:string;titleEn:string;summary:string;summaryEn:string;content:string;contentEn:string;category:string;kind:string;status:'published'|'draft'|'deleted';seoTitle:string;seoDescription:string;seoTitleEn?:string;seoDescriptionEn?:string;coverImage?:string;coverImageAlt?:string;image:string;imageAlt:string;source:string;updatedAt:string;faqs:FAQ[];publishedAt?:string};
export type Settings={name:string;phone:string;phoneLink:string;email:string;address:string;heroTitle:string;heroTitleEn:string;heroSummary:string;heroSummaryEn:string;seoTitle:string;seoDescription:string;siteUrl:string;indexing:boolean;portrait:string;instagram:string;youtube:string;facebook:string;googleSiteVerification?:string};
export type VideoRecord={id:string;title:string;titleEn:string;url:string;thumbnail:string;description:string;category:string;status:'published'|'draft'};
export type PhotoRecord={id:string;title:string;titleEn:string;image:string;alt:string;category:string};
export type Publication={id:string;citation:string;kind:string;year:string;url:string;title?:string;linkType?:string};
export type Thesis={id:string;title:string;author:string;university:string;year:string;role:string;url:string};
export type Archive={videos:VideoRecord[];photos:PhotoRecord[];publications:Publication[];theses:Thesis[]};
