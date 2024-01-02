import { Module } from '@nestjs/common';
import { User } from './models/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';
import { Providers } from '../enums/providers.enum';
import { ProductRepository } from '../product/repositories/product.repository';
import { Product } from '../product/models/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Product])],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    { provide: Providers.userRepository, useClass: UserRepository },
    { provide: Providers.productRepository, useClass: ProductRepository },
  ],
})
export class UserModule {}
