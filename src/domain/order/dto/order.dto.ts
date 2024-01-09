import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDTO {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  addressId: number;

  @ApiProperty()
  products: number[];
}

export class UpdateOrderDTO {
  @ApiProperty()
  products: number[];
}
