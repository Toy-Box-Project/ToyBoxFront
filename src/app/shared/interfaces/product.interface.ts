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
  category?: string;
  categoryId?: number;
  sellerId?: number;
  status?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: string | number;
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

/** UI-layer model used by ProductCardComponent and catalog mock data. */
export interface ProductCardData {
  id: number;
  title: string;
  category: string;
  price: number;
  location: string | null;
  status: string;
  image: string;
  badge: string;
  description?: string;
  province?: string;
  city?: string;
  seller?: {
    name: string;
    rating: number;
    reviews: number;
    city: string;
  };
}

/** Local model used by MyProductsComponent (matches current mock schema). */
export interface MyProduct {
  id_products: number;
  id_user: number;
  product_title: string;
  product_description: string;
  product_price: number;
  product_category: string;
  product_condition: string;
  product_status: string;
  product_created_at: string;
  product_updated_at: string;
  product_main_image: string;
}
