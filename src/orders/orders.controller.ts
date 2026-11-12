
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

import { CreateOrderDto } from './dto/create-order.dto.js';
import { OrdersService } from './order.service.js';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly orderService: OrdersService,
  ) {}

  // GET /orders
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  // GET /orders/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.findOne(id);
  }

  // POST /orders
  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.orderService.create(dto);
  }
}
