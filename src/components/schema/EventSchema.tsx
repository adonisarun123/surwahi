import { generateEventSchema } from '@/lib/seo';
import JsonLd from './JsonLd';

interface EventSchemaProps {
  name: string;
  description: string;
  path: string;
  image?: string | string[];
  startDate?: string;
  endDate?: string;
  recurring?: boolean;
  offers?: Array<{ name?: string; price: string; priceCurrency?: string }>;
}

export default function EventSchema(props: EventSchemaProps) {
  return <JsonLd schema={generateEventSchema(props)} />;
}
