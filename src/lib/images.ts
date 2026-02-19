// Centralized ImageKit image configuration
// Base URL for all ImageKit images
export const IMAGEKIT_BASE_URL = 'https://ik.imagekit.io/surwahi';

// Helper function to generate ImageKit URLs
export const getImageKitUrl = (path: string) => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // URL encode the path to handle spaces and special characters
  const encodedPath = encodeURI(cleanPath);
  return `${IMAGEKIT_BASE_URL}/${encodedPath}`;
};

// Accommodation Images
export const accommodationImages = {
  // Suite Category Images
  suites: {
    hero: getImageKitUrl('Surwahi Social Photos/Family Suite/Jholar_Room_Interior.JPG'),
    category: getImageKitUrl('Surwahi Social Photos/Family Suite/Jholar_Room_Interior.JPG'),
    forestCanopy: [
      getImageKitUrl('Surwahi Social Photos/Family Suite/Jholar_Bed_Portrait.JPG'),
      getImageKitUrl('Surwahi Social Photos/Family Suite/Jholar_Couch_Bed_Mezzanine_from_Entrance_Landscape.JPG'),
      getImageKitUrl('Surwahi Social Photos/Family Suite/Jholar_Washroom.JPG'),
      getImageKitUrl('Surwahi Social Photos/Family Suite/Jholar_Full_Suite_view_from_mezzanine_landscape (2) - Copy.JPG'),
    ],
    riverView: [
      getImageKitUrl('Surwahi Social Photos/Family Suite/Jholar_Bed_Almirah_from_Couch_Landscape.JPG'),
      getImageKitUrl('Surwahi Social Photos/Family Suite/Jholar_Work_Table_Couch_from_Bed_Portrait.JPG'),
    ]
  },

  // Dormitory Category Images
  dormitory: {
    category: getImageKitUrl('Surwahi Social Photos/Dormitory/Maikal_full_length_Landscape_1 - Copy.JPG'),
    mixed: [
      getImageKitUrl('Surwahi Social Photos/Dormitory/Maikal_Bunk_Beds_with_Open_Window - Copy.JPG'),
      getImageKitUrl('Surwahi Social Photos/Dormitory/Maikal_Quarter_Dome_1.JPG'),
    ]
  },

  // Camping Tents Category Images
  camping: {
    category: getImageKitUrl('Website Photos/IMG_4330 (1).JPG'),
    safari: [
      getImageKitUrl('Website Photos/IMG_4330 (1).JPG'),
      getImageKitUrl('Website Photos/IMG_0049.JPG'),
    ]
  }
};

// Experience Images
export const experienceImages = {
  wildlifeSafaris: getImageKitUrl('Website Photos/IMG_5090.JPG'),
  guidedForestTrails: getImageKitUrl('Website Photos/IMG20231020170019.jpg'),
  birdWatching: getImageKitUrl('Website Photos/IMG_5091.JPG'),
  farmLife: getImageKitUrl('Surwahi Social Photos/IMG_20200217_095015 (2).jpg'),
  knowYourCrop: getImageKitUrl('Surwahi Social Photos/Breakfast_under_Mahua_with_staff_in_Compound_2.jpg'),
  playAtSurwahi: getImageKitUrl('Website Photos/IMG_3048.JPG'),
  outdoorSports: getImageKitUrl('Website Photos/IMG_20220408_180107.jpg'),
  ecoVolunteering: getImageKitUrl('Surwahi Social Photos/IMG_20220408_180107.jpg'),
  culturalImmersion: getImageKitUrl('Surwahi Social Photos/Jholar_Corridor_Wall_Painting.jpg'),
  tribalCooking: getImageKitUrl('Surwahi Social Photos/Dining Area/Khichdi_Dinner_Displayed_On_Table_Landscape_Closeup_1 - Copy (2).JPG'),
};

// Workshop Images
export const workshopImages = {
  starGazing: getImageKitUrl('Website Photos/IMG_20250525_230538.jpg'),
  astroPhotography: getImageKitUrl('Website Photos/IMG_20250525_230538.jpg'),
  earthenPottery: getImageKitUrl('Website Photos/0eff556c5ffef77703536bec9bd14585.jpg'),
  gondArt: getImageKitUrl('Surwahi Social Photos/Jholar_Corridor_Wall_Painting_closeup.jpg'),
  bambooCrafting: getImageKitUrl('Website Photos/IMG_3202.JPG'),
  forestBathing: getImageKitUrl('Website Photos/IMG20231020171008.jpg'),
  leafPlate: getImageKitUrl('Website Photos/IMG_5104.JPG'),
  foodForaging: getImageKitUrl('Website Photos/IMG_5224.JPG'),
  herping: getImageKitUrl('Website Photos/IMG_4518.JPG'),
  regeneration: getImageKitUrl('Website Photos/IMG20231020171008.jpg'),
  governance: getImageKitUrl('Surwahi Social Photos/3c3adbb2-aacd-4c01-8aa0-01615b0912e8.jpeg'),
  naturesPharmacy: getImageKitUrl('Website Photos/IMG_5091.JPG'),
  buildWithMud: getImageKitUrl('Surwahi Social Photos/A.jpg'),
};

// Gallery Images
export const galleryImages = {
  lodgeExterior: getImageKitUrl('Surwahi Social Photos/Suite_Room_Lobby_Evening.jpg'),
  riverSuite: getImageKitUrl('Surwahi Social Photos/Family Suite/Jholar_Room_Interior.JPG'),
  hornbill: getImageKitUrl('Website Photos/IMG_5091.JPG'),
  tigerSafari: getImageKitUrl('Website Photos/IMG_5090.JPG'),
  diningExperience: getImageKitUrl('Surwahi Social Photos/Dining Area/Khichdi_Dinner_Displayed_On_Table_Landscape_Closeup_1 - Copy (2).JPG'),
  forestTrail: getImageKitUrl('Website Photos/IMG20231020170019.jpg'),
  commonArea: getImageKitUrl('Surwahi Social Photos/Corridor_Reception_Entrance_Night_Landscape_2.JPG'),
  wildMushrooms: getImageKitUrl('Website Photos/IMG_3048.JPG'),
  gondArt: getImageKitUrl('Surwahi Social Photos/Jholar_Corridor_Wall_Painting.jpg'),
  organicFarm: getImageKitUrl('Surwahi Social Photos/Breakfast_under_Mahua_with_staff_in_Compound_2.jpg'),
  starryNight: getImageKitUrl('Website Photos/IMG_20250525_230538.jpg'),
  earthenPottery: getImageKitUrl('Website Photos/0eff556c5ffef77703536bec9bd14585.jpg'),
};

// Sustainability Images
export const sustainabilityImages = {
  evapotranspirationToilets: getImageKitUrl('Surwahi Social Photos/Eathen Swimming Pool/WhatsApp Image 2025-04-14 at 10.03.48_5a837a8d.jpg'),
  treeCensus: getImageKitUrl('Website Photos/IMG_5091.JPG'),
  ecoConstruction: getImageKitUrl('Surwahi Social Photos/A.jpg'),
  sdgAlignment: getImageKitUrl('Website Photos/surwahi edit.png'),
};

// Blog Images
export const blogImages = {
  monsoonForest: getImageKitUrl('Website Photos/IMG20231020171008.jpg'),
  mudBuilding: getImageKitUrl('Surwahi Social Photos/A.jpg'),
  tigerSighting: getImageKitUrl('Website Photos/IMG_5090.JPG'),
};

// About Us Images
export const aboutUsImages = {
  foundersVision: getImageKitUrl('Website Photos/DJI_20250819094705_0108_D.JPG'),
  earlyConstruction: getImageKitUrl('Surwahi Social Photos/A.jpg'),
  communityMeeting: getImageKitUrl('Surwahi Social Photos/IMG_20200217_095015 (2).jpg'),
  lodgeToday: getImageKitUrl('Website Photos/DJI_20250819094744_0109_D.JPG'),
};

// Praises/Awards Images
export const praisesImages = {
  awards: getImageKitUrl('Website Photos/WhatsApp Image 2025-07-05 at 11.08.35_e81c41f3.jpg'),
  press: getImageKitUrl('Website Photos/WhatsApp Image 2025-07-05 at 11.08.31_ef81f369.jpg'),
};

// Common/Shared Images
export const commonImages = {
  heroImage: getImageKitUrl('WhatsApp Image 2025-10-24 at 19.36.22.jpeg'),
  logo: getImageKitUrl('surwahi-logo.png'),
};
