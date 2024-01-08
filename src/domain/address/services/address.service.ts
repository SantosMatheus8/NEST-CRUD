import {
  Inject,
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAddressDTO } from '../dto/address.dto';
import { Address } from '../models/address.entity';
import { IAddressRepository } from '../ports/addressRepository.interface';
import { Providers } from '../../../domain/enums/providers.enum';
import { IUserRepository } from '../../../domain/user/ports/userRepository.interface';

@Injectable()
export class AddressService {
  constructor(
    @Inject(Providers.addressRepository)
    private readonly addressRepository: IAddressRepository,
    @Inject(Providers.userRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  public async create(address: CreateAddressDTO): Promise<Address> {
    const newAddress = new Address();
    newAddress.description = address.description;
    newAddress.zipCode = address.zipCode;
    newAddress.street = address.street;
    newAddress.number = address.number;
    newAddress.complement = address.complement;
    newAddress.neighborhood = address.neighborhood;
    newAddress.city = address.city;
    newAddress.state = address.state;

    const user = await this.userRepository.findById(address.userId);

    newAddress.user = user;

    return await this.addressRepository.save(newAddress);
  }

  public async findAll(): Promise<Address[]> {
    return await this.addressRepository.findAll();
  }

  public async findById(id: number): Promise<Address> {
    const address = await this.addressRepository.findById(id);

    if (!address) {
      throw new NotFoundException('Produto não encontrado');
    }

    return address;
  }

  public async update(id: number, address: CreateAddressDTO): Promise<Address> {
    const addressExists = await this.findById(id);

    return await this.addressRepository.save(addressExists);
  }

  public async delete(id: number): Promise<void> {
    await this.findById(id);

    await this.addressRepository.delete(id);
  }
}
