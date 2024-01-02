import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from '../dto/user.dto';
import { User } from '../models/user.entity';

@ApiTags('Users')
@Controller({ version: '1', path: 'users' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    description: 'User created successfully',
    type: User,
    status: 201,
  })
  @Post()
  public async create(@Body() user: CreateUserDTO): Promise<User> {
    return this.userService.create(user);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    description: 'Users found successfully',
    type: [User],
    status: 200,
  })
  @Get()
  public async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Get one users' })
  @ApiResponse({
    description: 'User found successfully',
    type: User,
    status: 200,
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
  })
  @Get(':id')
  public async getUser(@Param('id') id: number): Promise<User> {
    return this.userService.findById(id);
  }

  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({
    description: 'User updated successfully',
    type: User,
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
    @Body() user: CreateUserDTO,
  ): Promise<User> {
    return this.userService.update(id, user);
  }

  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({
    description: 'User deleted successfully',
    status: 204,
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
  })
  @Delete(':id')
  public async delete(@Param('id') id: number): Promise<void> {
    return this.userService.delete(id);
  }
}
