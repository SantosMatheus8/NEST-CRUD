import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { AddressService } from '../services/address.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAddressDTO } from '../dto/address.dto';
import { Address } from '../models/address.entity';

@ApiTags('Addresss')
@Controller({ version: '1', path: 'addresses' })
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @ApiOperation({ summary: 'Create a new address' })
  @ApiResponse({
    description: 'Address created successfully',
    type: Address,
    status: 201,
  })
  @Post()
  public async create(@Body() address: CreateAddressDTO): Promise<Address> {
    return this.addressService.create(address);
  }

  @ApiOperation({ summary: 'Get all addresses' })
  @ApiResponse({
    description: 'Addresss found successfully',
    type: [Address],
    status: 200,
  })
  @Get()
  public async getAllAddresss(): Promise<Address[]> {
    return this.addressService.findAll();
  }

  @ApiOperation({ summary: 'Get one addresses' })
  @ApiResponse({
    description: 'Address found successfully',
    type: Address,
    status: 200,
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
  })
  @Get(':id')
  public async getAddress(@Param('id') id: number): Promise<Address> {
    return this.addressService.findById(id);
  }

  @ApiOperation({ summary: 'Update a address' })
  @ApiResponse({
    description: 'Address updated successfully',
    type: Address,
    status: 200,
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
  })
  @Put(':id')
  public async update(
    @Param('id') id: number,
    @Body() address: CreateAddressDTO,
  ): Promise<Address> {
    return this.addressService.update(id, address);
  }

  @ApiOperation({ summary: 'Delete a address' })
  @ApiResponse({
    description: 'Address deleted successfully',
    status: 204,
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
  })
  @Delete(':id')
  public async delete(@Param('id') id: number): Promise<void> {
    return this.addressService.delete(id);
  }
}
