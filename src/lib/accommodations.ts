import { getImageKitUrl } from './images';

export const rooms = {
  'forest-canopy-suite': {
    id: '1',
    name: 'Forest Canopy Suite',
    slug: 'forest-canopy-suite',
    category: 'Suites',
    description: 'Elevated suite with panoramic forest views and luxury amenities',
    longDescription: `Perched among the treetops, our Forest Canopy Suite offers an unparalleled view of the forest ecosystem. This spacious 45 sqm suite features floor-to-ceiling windows that frame the ever-changing forest landscape, from morning mists to golden hour light filtering through ancient sal trees.

The suite is designed with sustainability at its core, featuring solar-powered air cooling, rainwater-fed bathroom facilities, and furniture crafted from locally sourced, sustainably harvested wood. Wake to the symphony of over 200 bird species that call this forest home.

The elevated position provides natural ventilation and cooling, while the private balcony extends your living space into the canopy itself. Perfect for morning meditation, afternoon reading, or evening wildlife watching with provided binoculars.`,
    images: [
      {
        url: getImageKitUrl('Surwahi Social Photos/Family Suite/Jholar_Bed_Portrait.JPG'),
        alt: 'Spacious bedroom with king bed facing floor-to-ceiling forest view windows',
        caption: 'Wake up to panoramic forest views'
      },
      {
        url: getImageKitUrl('Surwahi Social Photos/Family Suite/Jholar_Couch_Bed_Mezzanine_from_Entrance_Landscape.JPG'),
        alt: 'Private balcony with seating overlooking forest canopy',
        caption: 'Private balcony in the treetops'
      },
      {
        url: getImageKitUrl('Surwahi Social Photos/Family Suite/Jholar_Washroom.JPG'),
        alt: 'Luxury bathroom with natural stone and forest views',
        caption: 'Eco-luxury bathroom with rainwater system'
      },
      {
        url: getImageKitUrl('Surwahi Social Photos/Family Suite/Jholar_Full_Suite_view_from_mezzanine_landscape (2) - Copy.JPG'),
        alt: 'Living area with locally crafted furniture and reading nook',
        caption: 'Comfortable living space with sustainable design'
      }
    ],
    basePrice: 9500,
    maxOccupancy: 3,
    bedConfiguration: 'King Bed + Daybed',
    size: '45 sqm',
    view: 'Forest Canopy',
    amenities: [
      'Solar-powered cooling',
      'Private balcony',
      'Filtered rainwater',
      'Organic toiletries',
      'Reading nook',
      'Work desk',
      'Mini refrigerator',
      'Coffee/tea station',
      'Wildlife viewing equipment',
      'Mosquito netting'
    ],
    ecoFeatures: [
      'Solar power system',
      'Rainwater harvesting',
      'Natural ventilation',
      'Locally sourced materials',
      'Minimal environmental impact',
      'Waste separation system'
    ],
    included: [
      'Daily breakfast',
      'Afternoon tea',
      'Nature walk access',
      'WiFi in common areas',
      'Parking',
      'Laundry service'
    ],
    accessibility: ['Ground floor access', 'Wide doorways'],
    rating: 4.8,
    reviewCount: 42,
    location: 'Canopy Level, East Wing',
    checkIn: '14:00',
    checkOut: '11:00',
    policies: {
      cancellation: 'Free cancellation up to 48 hours before check-in',
      pets: 'Pets not allowed',
      smoking: 'Smoking not permitted',
      extraBed: 'Extra bed available for ₹1,500/night',
      children: 'Children under 5 stay free'
    }
  },
  'river-view-suite': {
    id: '2',
    name: 'River View Suite',
    slug: 'river-view-suite',
    category: 'Suites',
    description: 'Elegant suite with a private balcony overlooking the serene river.',
    longDescription: `Located on the ground floor with a stunning view of the river, this suite offers a perfect blend of luxury and nature. The private balcony is an ideal spot for bird watching or simply relaxing to the sound of flowing water. The interior is adorned with local art and handcrafted furniture, creating a warm and inviting atmosphere.`,
    images: [
      { url: getImageKitUrl('Surwahi Social Photos/Family Suite/Jholar_Bed_Almirah_from_Couch_Landscape.JPG'), alt: 'River View Suite Bedroom', caption: 'Elegant bedroom with river view' },
      { url: getImageKitUrl('Surwahi Social Photos/Family Suite/Jholar_Work_Table_Couch_from_Bed_Portrait.JPG'), alt: 'River View Suite Balcony', caption: 'Private balcony overlooking the river' },
    ],
    basePrice: 10500,
    maxOccupancy: 2,
    bedConfiguration: 'Queen Bed',
    size: '40 sqm',
    view: 'River View',
    amenities: ['Private Balcony', 'River View', 'Air Conditioning', 'Eco Toiletries', 'Wi-Fi'],
    ecoFeatures: ['Solar Power', 'Locally Sourced Materials', 'Waste Recycling Program'],
    included: ['Daily Breakfast', 'Wi-Fi', 'Parking'],
    accessibility: ['Ground Floor Access'],
    rating: 4.9,
    reviewCount: 51,
    location: 'River Wing',
    checkIn: '14:00',
    checkOut: '11:00',
    policies: {
      cancellation: 'Free cancellation up to 72 hours before check-in.',
      pets: 'Not allowed',
      smoking: 'Not permitted',
      extraBed: 'Not available',
      children: 'Allowed',
    },
  },
  'mixed-dormitory': {
    id: '3',
    name: 'Mixed Dormitory',
    slug: 'mixed-dormitory',
    category: 'Dormitory',
    description: 'A social and affordable option for travelers, our mixed dormitory offers a comfortable and secure stay.',
    longDescription: `Our mixed dormitory is designed for the modern traveler. Each bunk is equipped with a personal reading light, charging station, and privacy curtain. Lockers are available to store your belongings securely. The dormitory has a shared bathroom and a common area for relaxing and meeting fellow travelers.`,
    images: [
      { url: getImageKitUrl('Surwahi Social Photos/Dormitory/Maikal_Bunk_Beds_with_Open_Window - Copy.JPG'), alt: 'Mixed Dormitory Bunks', caption: 'Comfortable bunk beds with privacy curtains' },
      { url: getImageKitUrl('Surwahi Social Photos/Dormitory/Maikal_Quarter_Dome_1.JPG'), alt: 'Dormitory Common Area', caption: 'Shared common area for relaxation' },
    ],
    basePrice: 1500,
    maxOccupancy: 8,
    bedConfiguration: 'Bunk Beds',
    size: '60 sqm',
    view: 'Garden View',
    amenities: ['Personal Lockers', 'Reading Lights', 'Charging Stations', 'Shared Bathroom', 'Wi-Fi', 'Air Conditioning'],
    ecoFeatures: ['Energy-Efficient Lighting', 'Water-Saving Fixtures'],
    included: ['Wi-Fi'],
    accessibility: ['Ground Floor Access'],
    rating: 4.5,
    reviewCount: 112,
    location: 'Community Wing',
    checkIn: '15:00',
    checkOut: '10:00',
    policies: {
      cancellation: 'Free cancellation up to 24 hours before check-in.',
      pets: 'Not allowed',
      smoking: 'Not permitted',
      extraBed: 'Not available',
      children: 'Not allowed',
    },
  },
  'safari-tent': {
    id: '4',
    name: 'Safari Tent',
    slug: 'safari-tent',
    category: 'Camping Tents',
    description: 'For a truly immersive experience, our safari tents offer the perfect blend of adventure and comfort.',
    longDescription: `Our safari tents are designed for those who want to be close to nature without roughing it. Each tent is equipped with comfortable twin beds, a private bathroom, and a small deck area. The tents are located in a secluded area of the property, offering privacy and a chance to spot wildlife.`,
    images: [
      { url: getImageKitUrl('Website Photos/IMG_4330 (1).JPG'), alt: 'Safari Tent Exterior', caption: 'Safari tent in a secluded setting' },
      { url: getImageKitUrl('Website Photos/IMG_0049.JPG'), alt: 'Safari Tent Interior', caption: 'Comfortable twin beds inside the tent' },
    ],
    basePrice: 4500,
    maxOccupancy: 2,
    bedConfiguration: 'Twin Beds',
    size: '25 sqm',
    view: 'Grasslands',
    amenities: ['Private Bathroom', 'Deck Area', 'Mosquito Netting', 'Fan'],
    ecoFeatures: ['Minimal Footprint', 'Solar Lighting'],
    included: ['Daily Breakfast'],
    accessibility: ['Ground Level'],
    rating: 4.7,
    reviewCount: 78,
    location: 'Camping Grounds',
    checkIn: '14:00',
    checkOut: '11:00',
    policies: {
      cancellation: 'Free cancellation up to 48 hours before check-in.',
      pets: 'Not allowed',
      smoking: 'Not permitted',
      extraBed: 'Not available',
      children: 'Allowed',
    },
  }
};
