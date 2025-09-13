export interface Profile {
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string;
}

export interface Balance {
  balance: number;
}

export interface ServiceItem {
  service_tariff: number;
  service_icon: string;
  service_name: string;
  service_code: string;
}

export interface BannerItem {
  banner_name: string;
  banner_image: string;
  description: string;
}

export interface ProfileDetails {
  profile: Profile;
  balance: Balance;
  services: ServiceItem[];
  banners: BannerItem[];
}

export interface Transaction {
  invoice_number: string;
  transaction_type: string;
  description: string;
  total_amount: number;
  created_on: string;
}
