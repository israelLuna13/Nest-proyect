import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
//type and rules sales content
export class TransactionContentsDto {
  @IsNotEmpty({ message: 'The product ID cannot be empty' })
  @IsInt({ message: 'Invalid product' })
  productId: number;

  @IsNotEmpty({ message: 'The amount cannot be empty' })
  @IsInt({ message: 'Invalid amount' }) // Validate quantity too
  quantity: number;

  @IsNotEmpty({ message: 'The price cannot be empty' })
  @IsNumber({}, { message: 'Invalid price' })
  price: number;
}
//sale
export class CreateTranstactionDto {
  @IsNotEmpty({ message: 'The total cannot be empty' })
  @IsNumber({}, { message: 'Invalid amount' })
  total: number;

  @IsOptional()
  coupon: string;

  @IsArray()
  @ArrayNotEmpty({ message: 'The contents cannot be empty' })
  @ValidateNested()
  @Type(() => TransactionContentsDto)
  contents: TransactionContentsDto[];
}
