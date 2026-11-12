
import {
  IsString,
  IsNotEmpty,
  IsIn,
  IsInt,
  Min,
  IsOptional,
  Matches,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';

import type { Area, orderStatus } from '../order.type.js';

// Validate individual dishes
export class CreateDishDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsInt()
  @Min(1)
  price!: number;
}

// Validate order data
export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  customerName!: string;

  @IsString()
  @IsIn(['Bole', 'Gerji', 'Megenagna', 'Kasanchis'])
  area!: Area;

  @IsString()
  @IsIn([
    'Pending',
    'Prepared',
    'Cancelled',
    'Delivered',
    'Preparing',
    'Rejected',
  ])
  status!: orderStatus;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateDishDto)
  dishes!: CreateDishDto[];

  @IsInt()
  @Min(1)
  total!: number;

  @IsOptional()
  @IsString()
  @Matches(/^09\d{8}$/)
  teleBirrPhone?: string;
}
