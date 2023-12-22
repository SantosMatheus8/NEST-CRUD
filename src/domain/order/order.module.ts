import { Module } from '@nestjs/common';
import { Order } from './models/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';
import { OrderRepository } from './repositories/order.repository';
import { Providers } from '../enums/providers.enum';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [
    OrderService,
    OrderRepository,
    { provide: Providers.orderRepository, useClass: OrderRepository },
  ],
})
export class OrderModule {}
