import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ProductModule } from './domain/product/product.module';
import { OrderModule } from './domain/order/order.module';

@Module({
  imports: [DatabaseModule, ProductModule, OrderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
