import { Module } from '@nestjs/common';
import { Order } from './models/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';
import { OrderRepository } from './repositories/order.repository';
import { Providers } from '../enums/providers.enum';
import { ProductRepository } from '../product/repositories/product.repository';
import { Product } from '../product/models/product.entity';
import { UserRepository } from '../user/repositories/user.repository';
import { User } from '../user/models/user.entity';
import { Address } from '../address/models/address.entity';
import { AddressRepository } from '../address/repositories/address.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Product, User, Address])],
  controllers: [OrderController],
  providers: [
    OrderService,
    OrderRepository,
    { provide: Providers.orderRepository, useClass: OrderRepository },
    { provide: Providers.productRepository, useClass: ProductRepository },
    { provide: Providers.userRepository, useClass: UserRepository },
    { provide: Providers.addressRepository, useClass: AddressRepository },
  ],
})
export class OrderModule {}
