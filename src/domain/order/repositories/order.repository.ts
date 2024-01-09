import { Injectable } from '@nestjs/common';
import { IOrderRepository } from '../ports/orderRepository.interface';
import { Order } from '../models/order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly typeormRepository: Repository<Order>,
  ) {}

  public async save(order: Order): Promise<Order> {
    return await this.typeormRepository.save(order);
  }

  public async findAll(): Promise<Order[]> {
    return await this.typeormRepository.find({
      relations: ['products', 'address'],
    });
  }

  public async findById(id: number): Promise<Order> {
    return await this.typeormRepository.findOne({
      where: { id },
      relations: ['products', 'address'],
    });
  }

  public async delete(id: number): Promise<void> {
    await this.typeormRepository.delete(id);
  }
}
