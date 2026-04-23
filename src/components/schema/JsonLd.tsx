type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue | unknown };

interface JsonLdProps {
  schema: Record<string, unknown> | Record<string, unknown>[];
  id?: string;
}

/**
 * Renders one or more Schema.org JSON-LD blocks.
 * Pass a single schema object or an array (rendered as `@graph`).
 */
export default function JsonLd({ schema, id }: JsonLdProps) {
  const payload = Array.isArray(schema)
    ? { '@context': 'https://schema.org', '@graph': schema as JsonValue[] }
    : schema;

  return (
    <script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
