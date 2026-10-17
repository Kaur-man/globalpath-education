export interface Service {
  id: number;
  title: string;
  slug: string;
  description: string;
  image_url: string | null;
  is_published: boolean;
  created_at: string;
}

export interface Destination {
  id: number;
  country_name: string;
  description: string | null;
  image_url: string | null;
  is_published: boolean;
  created_at: string;
}

export interface SuccessStory {
  id: number;
  title: string;
  category: string;
  image_url: string;
  story_url?: string | null;
  is_published: boolean;
  created_at: string;
}

export interface Enquiry {
  id?: number;
  name: string;
  phone: string;
  email?: string;
  country_interest?: string;
  message?: string;
  status?: string;
  created_at?: string;
}
