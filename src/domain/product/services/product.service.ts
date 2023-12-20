import {
  Inject,
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDTO } from '../dto/product.dto';
import { Product } from '../models/product.entity';
import { IProductRepository } from '../ports/productRepository.interface';
import { Providers } from '../../../domain/enums/providers.enum';

@Injectable()
export class ProductService {
  constructor(
    @Inject(Providers.productRepository)
    private readonly productRepository: IProductRepository,
  ) {}

  public async create(product: CreateProductDTO): Promise<Product> {
    if (product.price <= 0) {
      throw new BadRequestException(
        'O preço do produto deve ser um valor positivo e maior do que zero',
      );
    }

    if (product.quantity <= 0) {
      throw new BadRequestException(
        'A quantidade do produto deve ser um valor positivo e maior do que zero',
      );
    }

    if (!product?.name) {
      throw new BadRequestException('O nome é obrigatório');
    }

    const newProduct = new Product();
    newProduct.name = product.name;
    newProduct.price = product.price;
    newProduct.quantity = product.quantity;

    return await this.productRepository.save(newProduct);
  }

  public async findAll(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }

  public async findById(id: number): Promise<Product> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    return product;
  }

  public async update(id: number, product: CreateProductDTO): Promise<Product> {
    const productExists = await this.findById(id);

    if (product.price <= 0) {
      throw new BadRequestException(
        'O preço do produto deve ser um valor positivo e maior do que zero',
      );
    }

    if (product.quantity <= 0) {
      throw new BadRequestException(
        'A quantidade do produto deve ser um valor positivo e maior do que zero',
      );
    }

    productExists.name = product.name ? product.name : productExists.name;
    productExists.price = product.price;
    productExists.quantity = product.quantity;

    return await this.productRepository.save(productExists);
  }

  public async delete(id: number): Promise<void> {
    await this.findById(id);

    await this.productRepository.delete(id);
  }
}
