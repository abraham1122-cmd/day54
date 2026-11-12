
import type { Order } from './order.type.ts';

export interface OrderRepository {
  findById(id: number): Order | undefined;
  findAll(): Order[];
  create(order: Omit<Order, 'id'>): Order;
}

export class InMemoryOrderRepository implements OrderRepository {
  private readonly orders: Map<number, Order>;
  private nextId: number;

  constructor(initialOrders: Order[] = []) {
    this.orders = new Map(
      initialOrders.map((order) => [order.id, order])
    );

    this.nextId = Math.max(0, ...initialOrders.map(order => order.id)) + 1;
  }

  findById(id: number): Order | undefined {
    return this.orders.get(id);
  }

  findAll(): Order[] {
    return Array.from(this.orders.values());
  }

  create(order: Omit<Order, 'id'>): Order {
    const newOrder: Order = {
      id: this.nextId++,
      ...order,
    };

    this.orders.set(newOrder.id, newOrder);

    return newOrder;
  }
}
