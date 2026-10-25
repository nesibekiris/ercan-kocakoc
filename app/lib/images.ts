import {imageDimensions} from './image-dimensions';
export function imageSize(src:string){const size=imageDimensions[src]||(src.startsWith('/images/blog-covers/')?[1200,800] as [number,number]:undefined);return size?{width:size[0],height:size[1]}:{}}
function variant(src:string,width:number){const clinic=src.match(/^\/images\/clinic\/(clinic-\d{2})\.jpeg$/);if(clinic)return '/images/responsive/'+clinic[1]+'-'+width+'.webp';const stock=src.match(/^\/images\/licensed\/([a-z0-9-]+)\.webp$/);return stock?'/images/licensed/responsive/'+stock[1]+'-'+width+'.webp':null}
export function imageSource(src:string,width=800){return variant(src,width)||src}
export function imageSet(src:string){return variant(src,800)?[480,800,1200].map(w=>variant(src,w)+' '+w+'w').join(', '):undefined}
