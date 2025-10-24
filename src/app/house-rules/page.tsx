import { Leaf, Users, Wind, Heart, MessageCircle, Shield } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata(
  'House Rules & Responsible Travel',
  'Read our house rules and responsible travel code to ensure a safe and respectful stay for everyone.',
  '/house-rules'
);

const rulesDetails = {
  title: 'House Rules & Responsible Travel',
  description: 'To ensure a harmonious stay for all our guests and to honor our commitment to nature and the local community, we have a few guidelines. These are not just rules, but an invitation to join us in practicing a more conscious and respectful way of traveling.',
  houseRules: [
    {
      title: 'Respect for Nature',
      rule: 'Please do not litter. Use the designated bins for waste segregation. Do not feed or disturb the wildlife. Stick to the designated trails on nature walks.',
      icon: Leaf,
    },
    {
      title: 'Community Living',
      rule: 'We encourage a sense of community. Please be mindful of noise levels, especially in the early mornings and late evenings. Respect the privacy of other guests and our staff.',
      icon: Users,
    },
    {
      title: 'Resource Conservation',
      rule: 'Water is a precious resource. Please use it judiciously. Kindly switch off lights, fans, and other electrical appliances when not in use.',
      icon: Wind,
    },
    {
      title: 'Safety & Security',
      rule: 'While we are in a safe environment, we advise you to take care of your personal belongings. Inform our staff about your travel plans, especially if you are venturing out on your own.',
      icon: Shield,
    },
  ],
  responsibleTravelCode: [
    {
      title: 'Cultural Sensitivity',
      rule: 'Respect local customs and traditions. Dress modestly when visiting villages. Always ask for permission before photographing people.',
      icon: Heart,
    },
    {
      title: 'Support Local',
      rule: 'We encourage you to support the local economy by purchasing handicrafts directly from artisans and using local services.',
      icon: Users,
    },
    {
      title: 'Open Dialogue',
      rule: 'We are always open to feedback and suggestions. If you have any questions or concerns, please do not hesitate to speak with our team.',
      icon: MessageCircle,
    },
  ],
};

export default function HouseRulesPage() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
      </div>

      <section className="bg-sand-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-display text-display-xl text-forest-900 mb-4">
                {rulesDetails.title}
            </h1>
            <p className="text-body-lg text-soil-700 max-w-3xl mx-auto">
                {rulesDetails.description}
            </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* House Rules */}
          <div>
            <h2 className="font-display text-3xl text-forest-900 mb-8">Our House Rules</h2>
            <div className="space-y-6">
              {rulesDetails.houseRules.map((rule, index) => (
                <div key={index} className="flex items-start">
                  <rule.icon className="h-10 w-10 text-moss-500 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-xl text-forest-800">{rule.title}</h3>
                    <p className="text-soil-700">{rule.rule}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Responsible Travel Code */}
          <div>
            <h2 className="font-display text-3xl text-forest-900 mb-8">Our Responsible Travel Code</h2>
            <div className="space-y-6">
              {rulesDetails.responsibleTravelCode.map((code, index) => (
                <div key={index} className="flex items-start">
                  <code.icon className="h-10 w-10 text-moss-500 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-xl text-forest-800">{code.title}</h3>
                    <p className="text-soil-700">{code.rule}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
