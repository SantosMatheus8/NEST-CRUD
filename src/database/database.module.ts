import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Produto1699890607710 } from './migrations/1699890607710-produto';

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
          migrations: [Produto1699890607710],
        };
      },
    }),
  ],
})
export class DatabaseModule {}
