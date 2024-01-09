import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from '../dto/user.dto';
import { User } from '../models/user.entity';
import { IUserRepository } from '../ports/userRepository.interface';
import { Providers } from '../../../domain/enums/providers.enum';
import { IProductRepository } from '../../../domain/product/ports/productRepository.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject(Providers.userRepository)
    private readonly userRepository: IUserRepository,
    @Inject(Providers.productRepository)
    private readonly productRepository: IProductRepository,
  ) {}

  public async create(user: CreateUserDTO): Promise<User> {
    const newUser = new User();
    newUser.age = user.age;
    newUser.name = user.name;
    newUser.password = user.password;

    return await this.userRepository.save(newUser);
  }

  public async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  public async findById(id: number): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  public async update(id: number, user: CreateUserDTO): Promise<User> {
    const userExists = await this.findById(id);

    userExists.age = user.age;
    userExists.name = user.name;
    userExists.password = user.password;

    return await this.userRepository.save(userExists);
  }

  public async delete(id: number): Promise<void> {
    await this.findById(id);

    await this.userRepository.delete(id);
  }
}
