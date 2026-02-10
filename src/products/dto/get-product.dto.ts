import { IsNumberString, IsOptional } from 'class-validator';
//tipado del los parametros de la url
export class GetProductsQueryDto {
  @IsOptional()
  @IsNumberString({}, { message: 'Category most be number' })
  category_id: number;

  @IsOptional()
  @IsNumberString({}, { message: 'Amount most be number' })
  take: number;

  @IsOptional()
  @IsNumberString({}, { message: 'Skip most be number' })
  skip: number;
}
