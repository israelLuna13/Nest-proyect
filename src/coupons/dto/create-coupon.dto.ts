import { IsDateString, IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class CreateCouponDto {
  @IsNotEmpty({ message: 'Coupon name cannot be empty' })
  name: string;

  @IsNotEmpty({ message: 'Porcentage amount cannot be empty' })
  @IsInt({ message: 'The porcentage most be beetwen 1 and 100' })
  @Max(100, { message: 'El descuento maximo es de 100' })
  @Min(1, { message: 'El descuento mminimo es 1' })
  @IsNotEmpty({ message: 'Porcentage amount cannot be empty' })
  porcentage: number;

  @IsNotEmpty({ message: 'Date cannot be empty' })
  @IsDateString({}, { message: 'Invalid date' })
  expirationDate: Date;
}
