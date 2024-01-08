import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Produto1699890607710 } from './migrations/1699890607710-produto';
import { DataSource } from 'typeorm';
import { CreateUserTable1704228361655 } from './migrations/1704228361655-create-user-table';
import { CreateOrderTable1704744666249 } from './migrations/1704744666249-create-order-table';
import { CreateAddressTable1704742459148 } from './migrations/1704742459148-create-address-table';
import { CreateOrderProductsTable1704744673250 } from './migrations/1704744673250-create-order-products-table';

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
            CreateUserTable1704228361655,
            CreateOrderTable1704744666249,
            CreateAddressTable1704742459148,
            CreateOrderProductsTable1704744673250,
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
    CreateUserTable1704228361655,
    CreateOrderTable1704744666249,
    CreateAddressTable1704742459148,
    CreateOrderProductsTable1704744673250,
  ],
});
