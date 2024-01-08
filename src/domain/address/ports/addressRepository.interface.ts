import { Address } from '../models/address.entity';

export interface IAddressRepository {
  save(product: Address): Promise<Address>;
  findAll(): Promise<Address[]>;
  findById(id: number): Promise<Address>;
  delete(id: number): Promise<void>;
  findAddressesByIds(ids: number[]): Promise<Address[]>;
}
