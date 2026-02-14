import { PartialType } from '@nestjs/mapped-types';
import { CreateTranstactionDto } from './create-transtaction.dto';

export class UpdateTranstactionDto extends PartialType(CreateTranstactionDto) {}
