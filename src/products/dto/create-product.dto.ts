import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';
//estructura tipada + validacion para construr un registro de la entity o tabla, valida datos , protege la entidad;
export class CreateProductDto {
  @IsNotEmpty({ message: 'The name produc cannot be empty' })
  @IsString({ message: 'Invalid name' })
  name: string;
  @IsNotEmpty({ message: 'The  price cannot be empty' })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Invalid price' })
  price: number;

  @IsNotEmpty({ message: 'The  inventory cannot be empty' })
  @IsNumber({ maxDecimalPlaces: 0 }, { message: 'Invalid amount' })
  inventory: number;

  @IsNotEmpty({ message: 'The  category cannot be empty' })
  @IsInt({ message: 'Invalid category' })
  categoryId: number;
}
