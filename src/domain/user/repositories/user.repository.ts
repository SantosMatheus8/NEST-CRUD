import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../ports/userRepository.interface';
import { User } from '../models/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly typeormRepository: Repository<User>,
  ) {}

  public async save(user: User): Promise<User> {
    return await this.typeormRepository.save(user);
  }

  public async findAll(): Promise<User[]> {
    return await this.typeormRepository.find();
  }

  public async findById(id: number): Promise<User> {
    return await this.typeormRepository.findOne({ where: { id } });
  }

  public async delete(id: number): Promise<void> {
    await this.typeormRepository.delete(id);
  }
}
