
import { Module } from '@nestjs/common';
import { OrdersService, ORDER_REPOSITORY } from './order.service.js';
import { OrdersController } from './orders.controller.js';
import { InMemoryOrderRepository } from './order.repository.js';

@Module({
  providers: [
    OrdersService,
    {
      provide: ORDER_REPOSITORY,
      useClass: InMemoryOrderRepository,
    },
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}
