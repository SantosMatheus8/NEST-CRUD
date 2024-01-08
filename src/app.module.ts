import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ProductModule } from './domain/product/product.module';
import { OrderModule } from './domain/order/order.module';
import { UserModule } from './domain/user/user.module';
import { AddressModule } from './domain/address/address.module';

@Module({
  imports: [
    DatabaseModule,
    ProductModule,
    OrderModule,
    UserModule,
    AddressModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
