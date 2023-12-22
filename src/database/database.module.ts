import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Produto1699890607710 } from './migrations/1699890607710-produto';
import { DataSource } from 'typeorm';
import { CreateOrderTable1703252196122 } from './migrations/1703252196122-create-order-table';
import { CreateOrdersProductsTable1703252214770 } from './migrations/1703252214770-create-orders-products-table';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (): TypeOrmModuleOptions => {
        return {
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'root',
          database: 'postgres',
          entities: [__dirname + '/../**/*.entity.js'],
          synchronize: false,
          migrations: [
            Produto1699890607710,
            CreateOrderTable1703252196122,
            CreateOrdersProductsTable1703252214770,
          ],
        };
      },
    }),
  ],
})
export class DatabaseModule {}

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'postgres',
  entities: [__dirname + '/../**/*.entity.js'],
  synchronize: false,
  migrations: [
    Produto1699890607710,
    CreateOrderTable1703252196122,
    CreateOrdersProductsTable1703252214770,
  ],
});
