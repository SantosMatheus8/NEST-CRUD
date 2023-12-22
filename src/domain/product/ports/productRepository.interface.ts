import { Product } from '../models/product.entity';

export interface IProductRepository {
  save(product: Product): Promise<Product>;
  findAll(): Promise<Product[]>;
  findById(id: number): Promise<Product>;
  delete(id: number): Promise<void>;
  findProductsByIds(ids: number[]): Promise<Product[]>;
}
