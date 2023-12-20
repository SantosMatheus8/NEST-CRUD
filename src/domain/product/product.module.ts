import { Module } from '@nestjs/common';
import { Product } from './models/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { ProductRepository } from './repositories/product.repository';
import { Providers } from '../enums/providers.enum';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductRepository,
    { provide: Providers.productRepository, useClass: ProductRepository },
  ],
})
export class ProductModule {}
