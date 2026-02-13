export interface ServiceItem {
  name: string;
  price: number;
  description?: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  service: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
}