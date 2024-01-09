import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDTO, UpdateOrderDTO } from '../dto/order.dto';
import { Order } from '../models/order.entity';
import { IOrderRepository } from '../ports/orderRepository.interface';
import { Providers } from '../../../domain/enums/providers.enum';
import { IProductRepository } from '../../../domain/product/ports/productRepository.interface';
import { Product } from '../../../domain/product/models/product.entity';
import { IUserRepository } from '../../../domain/user/ports/userRepository.interface';
import { IAddressRepository } from '../../../domain/address/ports/addressRepository.interface';

@Injectable()
export class OrderService {
  constructor(
    @Inject(Providers.orderRepository)
    private readonly orderRepository: IOrderRepository,
    @Inject(Providers.productRepository)
    private readonly productRepository: IProductRepository,
    @Inject(Providers.userRepository)
    private readonly userRepository: IUserRepository,
    @Inject(Providers.addressRepository)
    private readonly addressRepository: IAddressRepository,
  ) {}

  public async create(order: CreateOrderDTO): Promise<Order> {
    const products = await this.productRepository.findProductsByIds(
      order.products,
    );

    await this.existsProducts(order.products, products);

    const user = await this.userRepository.findById(order.userId);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    const address = await this.addressRepository.findById(order.addressId);

    if (!address) {
      throw new NotFoundException('Endereço não encontrado');
    }

    const productsToSave = order.products.map((productId) => {
      const product = products.find((p) => p.id === productId);

      if (product) {
        if (product.quantity < 1) {
          throw new BadRequestException('Produto sem estoque suficiente');
        }
        product.quantity -= 1;
        return product;
      }
    });

    const price = products.reduce((total, product) => total + product.price, 0);
    const newOrder = new Order();
    newOrder.products = products;
    newOrder.price = price;
    newOrder.user = user;
    newOrder.address = address;

    await this.productRepository.saveAll(productsToSave);
    return await this.orderRepository.save(newOrder);
  }

  public async findAll(): Promise<Order[]> {
    return await this.orderRepository.findAll();
  }

  public async findById(id: number): Promise<Order> {
    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new NotFoundException('Pedido não encontrado');
    }

    return order;
  }

  public async update(id: number, order: UpdateOrderDTO): Promise<Order> {
    const orderExists = await this.findById(id);

    const products = await this.productRepository.findProductsByIds(
      order.products,
    );

    await this.existsProducts(order.products, products);

    const productsToSave = order.products.map((productId) => {
      const product = products.find((p) => p.id === productId);

      if (product) {
        if (product.quantity < 1) {
          throw new BadRequestException('Produto sem estoque suficiente');
        }
        product.quantity -= 1;
        return product;
      }
    });

    const price = products.reduce((total, product) => total + product.price, 0);
    orderExists.products = products;
    orderExists.price = price;

    await this.productRepository.saveAll(productsToSave);
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
