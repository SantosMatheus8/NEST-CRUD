import { Injectable } from '@nestjs/common';
import { IProductRepository } from '../ports/productRepository.interface';
import { Product } from '../models/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly typeormRepository: Repository<Product>,
  ) {}

  public async save(product: Product): Promise<Product> {
    return await this.typeormRepository.save(product);
  }

  public async findAll(): Promise<Product[]> {
    return await this.typeormRepository.find();
  }

  public async findById(id: number): Promise<Product> {
    return await this.typeormRepository.findOne({ where: { id } });
  }

  public async findProductsByIds(ids: number[]): Promise<Product[]> {
    const products = Promise.all(
      ids.map(async (id) => {
        return await this.typeormRepository.findOne({ where: { id } });
      }),
    );
    return products;
  }

  public async delete(id: number): Promise<void> {
    await this.typeormRepository.delete(id);
  }
}
