export interface ProductsType {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
  isFavorite?: boolean;
  quantity?: number;
}
