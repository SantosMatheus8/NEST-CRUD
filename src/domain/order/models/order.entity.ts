import { User } from 'src/domain/user/models/user.entity';
import { Product } from '../../../domain/product/models/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Address } from '../../../domain/address/models/address.entity';

@Entity('orders', { synchronize: false })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @ManyToMany(() => Product, (feature) => feature.orders)
  @JoinTable({
    name: 'orders_products',
    joinColumn: {
      name: 'order_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
  })
  products: Product[];

  @ManyToOne(() => User, (user) => user.order)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @OneToOne(() => Address, (address) => address.order)
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
