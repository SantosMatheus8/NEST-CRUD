import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDTO {
  @ApiProperty()
  cep: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  products: number[];
}
