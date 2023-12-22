import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrderDTO } from '../dto/order.dto';
import { Order } from '../models/order.entity';

@ApiTags('Orders')
@Controller({ version: '1', path: 'orders' })
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({
    description: 'Order created successfully',
    type: Order,
    status: 201,
  })
  @Post()
  public async create(@Body() order: CreateOrderDTO): Promise<Order> {
    return this.orderService.create(order);
  }

  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({
    description: 'Orders found successfully',
    type: [Order],
    status: 200,
  })
  @Get()
  public async getAllOrders(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @ApiOperation({ summary: 'Get one orders' })
  @ApiResponse({
    description: 'Order found successfully',
    type: Order,
    status: 200,
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
  })
  @Get(':id')
  public async getOrder(@Param('id') id: number): Promise<Order> {
    return this.orderService.findById(id);
  }

  @ApiOperation({ summary: 'Update a order' })
  @ApiResponse({
    description: 'Order updated successfully',
    type: Order,
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
    @Body() order: CreateOrderDTO,
  ): Promise<Order> {
    return this.orderService.update(id, order);
  }

  @ApiOperation({ summary: 'Delete a order' })
  @ApiResponse({
    description: 'Order deleted successfully',
    status: 204,
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
  })
  @Delete(':id')
  public async delete(@Param('id') id: number): Promise<void> {
    return this.orderService.delete(id);
  }
}
