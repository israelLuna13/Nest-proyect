import { IsString, IsNotEmpty } from 'class-validator';
//SERIA EL EQUIVALENTE A EXPRESS VALIDATOR EN NODE
export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty({message:'The category name cannot be empty'})
  name: string;
}
