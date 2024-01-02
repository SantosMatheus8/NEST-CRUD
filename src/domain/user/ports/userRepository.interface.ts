import { User } from '../models/user.entity';

export interface IUserRepository {
  save(user: User): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User>;
  delete(id: number): Promise<void>;
}
