import { Module } from '@nestjs/common';
import { Order } from './models/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';
import { OrderRepository } from './repositories/order.repository';
import { Providers } from '../enums/providers.enum';
import { ProductRepository } from '../product/repositories/product.repository';
import { Product } from '../product/models/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Product])],
  controllers: [OrderController],
  providers: [
    OrderService,
    OrderRepository,
    { provide: Providers.orderRepository, useClass: OrderRepository },
    { provide: Providers.productRepository, useClass: ProductRepository },
  ],
})
export class OrderModule {}
