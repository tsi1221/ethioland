import api from './api';

export interface Property {
  id: string;
  title: string;
  description: string;
  type: 'LAND' | 'HOUSE' | 'APARTMENT' | 'COMMERCIAL' | 'VILLA' | 'CONDO';
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'SOLD' | 'RENTED' | 'INACTIVE';
  price: number;
  negotiable: boolean;
  currency: string;
  size?: number;
  bedrooms?: number;
  bathrooms?: number;
  floors?: number;
  yearBuilt?: number;
  address: string;
  city: string;
  region: string;
  country: string;
  latitude?: number;
  longitude?: number;
  features: string[];
  amenities: string[];
  images: string[];
  videos: string[];
  virtualTourUrl?: string;
  owner: {
    id: string;
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    avatar?: string;
  };
  isFavorited?: boolean;
  _count?: {
    favorites: number;
    views: number;
    comments: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface PropertyFilters {
  page?: number;
  limit?: number;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  city?: string;
  region?: string;
  bedrooms?: number;
  bathrooms?: number;
  minSize?: number;
  maxSize?: number;
  features?: string[];
  sortBy?: string;
  order?: 'asc' | 'desc';
  status?: string;
  search?: string;
}

class PropertyService {
  async getProperties(filters: PropertyFilters = {}) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          params.append(key, value.join(','));
        } else {
          params.append(key, value.toString());
        }
      }
    });
    
    const response = await api.get(`/properties?${params.toString()}`);
    return response.data.data;
  }

  async getPropertyById(id: string) {
    const response = await api.get(`/properties/${id}`);
    return response.data.data;
  }

  async createProperty(data: Partial<Property>) {
    const response = await api.post('/properties', data);
    return response.data.data;
  }

  async updateProperty(id: string, data: Partial<Property>) {
    const response = await api.put(`/properties/${id}`, data);
    return response.data.data;
  }

  async deleteProperty(id: string) {
    const response = await api.delete(`/properties/${id}`);
    return response.data;
  }

  async getMyProperties(status?: string) {
    const params = status ? `?status=${status}` : '';
    const response = await api.get(`/properties/user/my-properties${params}`);
    return response.data.data;
  }

  async toggleFavorite(id: string) {
    const response = await api.post(`/properties/${id}/favorite`);
    return response.data.data;
  }

  async getFavorites() {
    const response = await api.get('/properties/user/favorites');
    return response.data.data;
  }

  async getFeaturedProperties() {
    const response = await api.get('/properties/featured');
    return response.data.data;
  }
}

export default new PropertyService();