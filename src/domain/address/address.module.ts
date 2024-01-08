import { Module } from '@nestjs/common';
import { Address } from './models/address.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressController } from './controllers/address.controller';
import { AddressService } from './services/address.service';
import { AddressRepository } from './repositories/address.repository';
import { Providers } from '../enums/providers.enum';
import { UserRepository } from '../user/repositories/user.repository';
import { User } from '../user/models/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Address, User])],
  controllers: [AddressController],
  providers: [
    AddressService,
    AddressRepository,
    { provide: Providers.addressRepository, useClass: AddressRepository },
    { provide: Providers.userRepository, useClass: UserRepository },
  ],
})
export class AddressModule {}
