import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDTO {
  @ApiProperty()
  description: string;

  @ApiProperty()
  zipCode: string;

  @ApiProperty()
  street: string;

  @ApiProperty()
  number: number;

  @ApiProperty()
  complement: string;

  @ApiProperty()
  neighborhood: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  userId: number;
}
