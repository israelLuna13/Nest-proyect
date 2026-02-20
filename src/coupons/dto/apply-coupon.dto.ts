import { IsNotEmpty } from 'class-validator';

export class ApplyCouponDto {
  @IsNotEmpty({ message: 'The coupon name cannot be empty' })
  coupon_name: string;
}
