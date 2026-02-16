
import Link from 'next/link';

interface CTAProps {
    title?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
    className?: string;
}

export default function BookingCTA({
    title = "Ready to Experience the Wild?",
    description = "Book your stay at Surwahi Eco-Lodge and immerse yourself in nature.",
    buttonText = "Book Your Stay",
    buttonLink = "/accommodations",
    className = ''
}: CTAProps) {
    return (
        <section className={`py-16 bg-forest-900 text-white ${className}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="font-display text-3xl md:text-4xl mb-6">{title}</h2>
                <p className="text-lg text-sand-100 max-w-2xl mx-auto mb-8 font-light">
                    {description}
                </p>
                <Link
                    href={buttonLink}
                    className="inline-block bg-moss-500 text-white px-8 py-3 rounded-full font-medium hover:bg-moss-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
                >
                    {buttonText}
                </Link>
            </div>
        </section>
    );
}
