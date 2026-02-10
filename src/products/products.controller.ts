import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductsQueryDto } from './dto/get-product.dto';
import { IdValidationPipe } from 'src/common/pipes/id-validation/id-validation.pipe';
//url para acceder a productos
@Controller('products')
export class ProductsController {
  //  private productsService: ProductsService;

  // constructor(productsService: ProductsService) {
  //   this.productsService = productsService;
  // }
  //manera default y mas corta de hacerlo
  //inyeccion de dependencias(service), es como pasarle parametros a la clase
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  //read url params
  @Get()
  findAll(@Query() query: GetProductsQueryDto) {
    const category = query.category_id ? query.category_id : null;
    const take = query.take ? query.take : 10;
    const skip = query.skip ? query.skip : 0;

    return this.productsService.findAll(category, take, skip);
  }

  @Get(':id')
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', IdValidationPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.productsService.remove(+id);
  }
}
