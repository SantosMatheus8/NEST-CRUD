import {
  Inject,
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDTO } from '../dto/order.dto';
import { Order } from '../models/order.entity';
import { IOrderRepository } from '../ports/orderRepository.interface';
import { Providers } from '../../../domain/enums/providers.enum';
import { IProductRepository } from '../../../domain/product/ports/productRepository.interface';
import { Product } from 'src/domain/product/models/product.entity';

@Injectable()
export class OrderService {
  constructor(
    @Inject(Providers.orderRepository)
    private readonly orderRepository: IOrderRepository,
    @Inject(Providers.productRepository)
    private readonly productRepository: IProductRepository,
  ) {}

  public async create(order: CreateOrderDTO): Promise<Order> {
    if (order.price <= 0) {
      throw new BadRequestException(
        'O preço do pedido deve ser um valor positivo e maior do que zero',
      );
    }

    const products = await this.productRepository.findProductsByIds(
      order.products,
    );

    await this.existsProducts(order.products, products);

    const newOrder = new Order();
    newOrder.products = products;
    newOrder.price = order.price;
    newOrder.cep = order.cep;

    return await this.orderRepository.save(newOrder);
  }

  public async findAll(): Promise<Order[]> {
    return await this.orderRepository.findAll();
  }

  public async findById(id: number): Promise<Order> {
    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new NotFoundException('Produto não encontrado');
    }

    return order;
  }

  public async update(id: number, order: CreateOrderDTO): Promise<Order> {
    const orderExists = await this.findById(id);

    if (order.price <= 0) {
      throw new BadRequestException(
        'O preço do pedido deve ser um valor positivo e maior do que zero',
      );
    }

    const products = await this.productRepository.findProductsByIds(
      order.products,
    );

    await this.existsProducts(order.products, products);

    orderExists.cep = order.cep;
    orderExists.price = order.price;
    orderExists.products = products;

    return await this.orderRepository.save(orderExists);
  }

  public async delete(id: number): Promise<void> {
    await this.findById(id);

    await this.orderRepository.delete(id);
  }

  private async existsProducts(
    productsIds: number[],
    products: Product[],
  ): Promise<void> {
    const ids = products.map((product) => product?.id);
    const productsNotFound = productsIds.filter(
      (productId) => !ids.includes(productId),
    );
    if (productsNotFound.length > 0) {
      throw new NotFoundException(
        `O(s) seguinte(s) produto(s) não foram encontrado(s): ${productsNotFound.join(
          ', ',
        )}`,
      );
    }
  }
}
