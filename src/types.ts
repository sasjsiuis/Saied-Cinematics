export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  youtubeUrl: string;
  duration?: string;
  tools: string[];
  client?: string;
  order: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  videoPreview?: string;
  order: number;
}

export interface Package {
  id: string;
  name: string;
  price: number;
  features: string[];
  highlighted: boolean;
  order: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  image: string;
}

export interface SiteSettings {
  hero: {
    title: string;
    subtitle: string;
    intro: string;
    heroImage: string;
  };
  social: {
    facebook?: string;
    youtube?: string;
    instagram?: string;
    linkedin?: string;
    fiverr?: string;
  };
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
  };
  theme: {
    primaryColor: string;
    secondaryColor: string;
    glowStrength: number;
  };
}
