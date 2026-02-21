import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TranstactionsService } from './transtactions.service';
import { CreateTranstactionDto } from './dto/create-transtaction.dto';
// import { UpdateTranstactionDto } from './dto/update-transtaction.dto';
import { IdValidationPipe } from '../common/pipes/id-validation/id-validation.pipe';

@Controller('transtactions')
export class TranstactionsController {
  constructor(private readonly transtactionsService: TranstactionsService) {}

  @Post()
  create(@Body() createTranstactionDto: CreateTranstactionDto) {
    return this.transtactionsService.create(createTranstactionDto);
  }

  @Get()
  findAll(@Query('transactionDate') transactionDate: string) {
    return this.transtactionsService.findAll(transactionDate);
  }

  @Get(':id')
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.transtactionsService.findOne(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateTranstactionDto: UpdateTranstactionDto,
  // ) {
  //   return this.transtactionsService.update(+id, updateTranstactionDto);
  // }

  @Delete(':id')
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.transtactionsService.remove(+id);
  }
}
