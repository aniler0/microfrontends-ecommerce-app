export interface ProductsType {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  isFavorite?: boolean;
  quantity?: number | undefined;
}
