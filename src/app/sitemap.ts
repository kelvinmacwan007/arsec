import type {MetadataRoute} from 'next';
import {allPages} from '@/content/pages';
export default function sitemap():MetadataRoute.Sitemap {const base=process.env.NEXT_PUBLIC_SITE_URL;return base?['/',...allPages.map(p=>p.path)].map(path=>({url:base.replace(/\/$/,'')+path,lastModified:new Date()})):[];}
