
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { OrderRepository } from './order.repository.js';
import type { CreateOrderDto } from './dto/create-order.dto.js';

export const ORDER_REPOSITORY = 'ORDER_REPOSITORY';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: OrderRepository,
  ) {}

  // Get all orders
  findAll() {
    return this.orderRepository.findAll();
  }

  // Get one order by ID
  findOne(id: number) {
    const order = this.orderRepository.findById(id);

    if (!order) {
      throw new NotFoundException(`Order ${id} not found`);
    }

    return order;
  }

  // Create a new order
  create(dto: CreateOrderDto) {
    return this.orderRepository.create(dto);
  }
}
