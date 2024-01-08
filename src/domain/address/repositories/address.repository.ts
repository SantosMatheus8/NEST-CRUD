import { Injectable } from '@nestjs/common';
import { IAddressRepository } from '../ports/addressRepository.interface';
import { Address } from '../models/address.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AddressRepository implements IAddressRepository {
  constructor(
    @InjectRepository(Address)
    private readonly typeormRepository: Repository<Address>,
  ) {}

  public async save(address: Address): Promise<Address> {
    return await this.typeormRepository.save(address);
  }

  public async findAll(): Promise<Address[]> {
    return await this.typeormRepository.find();
  }

  public async findById(id: number): Promise<Address> {
    return await this.typeormRepository.findOne({ where: { id } });
  }

  public async findAddressesByIds(ids: number[]): Promise<Address[]> {
    const addresses = Promise.all(
      ids.map(async (id) => {
        return await this.typeormRepository.findOne({ where: { id } });
      }),
    );
    return addresses;
  }

  public async delete(id: number): Promise<void> {
    await this.typeormRepository.delete(id);
  }
}
