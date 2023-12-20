import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductDTO } from '../dto/product.dto';
import { Product } from '../models/product.entity';

@ApiTags('Products')
@Controller({ version: '1', path: 'products' })
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    description: 'Product created successfully',
    type: Product,
    status: 201,
  })
  @Post()
  public async create(@Body() product: CreateProductDTO): Promise<Product> {
    return this.productService.create(product);
  }

  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({
    description: 'Products found successfully',
    type: [Product],
    status: 200,
  })
  @Get()
  public async getAllProducts(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @ApiOperation({ summary: 'Get one products' })
  @ApiResponse({
    description: 'Product found successfully',
    type: Product,
    status: 200,
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
  })
  @Get(':id')
  public async getProduct(@Param('id') id: number): Promise<Product> {
    return this.productService.findById(id);
  }

  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({
    description: 'Product updated successfully',
    type: Product,
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
    @Body() product: CreateProductDTO,
  ): Promise<Product> {
    return this.productService.update(id, product);
  }

  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({
    description: 'Product deleted successfully',
    status: 204,
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
  })
  @Delete(':id')
  public async delete(@Param('id') id: number): Promise<void> {
    return this.productService.delete(id);
  }
}
