import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDTO {
  @ApiProperty()
  cep: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  addressId: number;

  @ApiProperty()
  products: number[];
}
