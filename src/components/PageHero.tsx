import Image from 'next/image';

export default function PageHero({ title, subtitle, image }: { title: string; subtitle?: string; image?: string }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-forest-900 to-forest-700">
      {image && (
        <>
          <Image src={image} alt="" fill priority sizes="100vw" className="object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-900 via-forest-900/70 to-forest-900/40" aria-hidden="true"></div>
        </>
      )}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-14 text-center">
        <h1 className="font-display text-display-xl text-bone-0 mb-4">{title}</h1>
        {subtitle && <p className="text-body-lg text-bone-0/85 max-w-2xl mx-auto">{subtitle}</p>}
        <span className="block w-16 h-1 bg-clay-500 rounded-full mx-auto mt-6" aria-hidden="true"></span>
      </div>
    </section>
  );
}
