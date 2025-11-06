export interface Profile {
  name: string;
  title: string;
  company: string;
  avatarUrl: string;
  bio: string;
  contact: {
    phone: string;
    email: string;
    website?: string;
    linkedin?: string;
    github?: string;
    instagram?: string;
    twitter?: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
}