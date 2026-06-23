export type DateString = string;

export type PublicationStatus =
  | 'draft'
  | 'published'
  | 'under_review'
  | 'removed'
  | 'sold';

export type ItemStatus =
  | 'available'
  | 'sold'
  | 'paused'
  | 'deleted';

export interface ProductImage {
  id_photos: number;
  photo_url: string;
  order: number | null;
  fk_items_id: number;
}

export interface Product {
  id_items: number;
  title: string;
  description: string | null;
  price: number;
  conservation_status: PublicationStatus;
  location: string | null;
  publication_date: DateString;
  fk_seller_id: number;
  fk_categories_id: number;
  item_update: DateString | null;
  item_status: ItemStatus | null;
  images?: ProductImage[];
}

export interface ProductFilters {
  search?: string;
  categoryId?: number;
  sellerId?: number;
  status?: ItemStatus | PublicationStatus;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}

export interface PaginatedProducts {
  items: Product[];
  total: number;
  page: number;
  limit: number;
}

export interface CreateProductRequest {
  title: string;
  description?: string | null;
  price: number;
  conservation_status: PublicationStatus;
  location?: string | null;
  fk_categories_id: number;
}
