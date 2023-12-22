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

@Injectable()
export class OrderService {
  constructor(
    @Inject(Providers.orderRepository)
    private readonly orderRepository: IOrderRepository,
  ) {}

  public async create(order: CreateOrderDTO): Promise<Order> {
    const newOrder = new Order();

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

    return await this.orderRepository.save(orderExists);
  }

  public async delete(id: number): Promise<void> {
    await this.findById(id);

    await this.orderRepository.delete(id);
  }
}
