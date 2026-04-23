import { generateTouristAttractionSchema } from '@/lib/seo';
import JsonLd from './JsonLd';

interface TouristAttractionSchemaProps {
  name: string;
  description: string;
  path: string;
  image?: string | string[];
  keywords?: string[];
}

export default function TouristAttractionSchema(props: TouristAttractionSchemaProps) {
  return <JsonLd schema={generateTouristAttractionSchema(props)} />;
}
