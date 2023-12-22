import { Order } from '../models/order.entity';

export interface IOrderRepository {
  save(order: Order): Promise<Order>;
  findAll(): Promise<Order[]>;
  findById(id: number): Promise<Order>;
  delete(id: number): Promise<void>;
}
