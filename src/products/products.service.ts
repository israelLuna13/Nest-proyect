import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';

//Logica de negocio
//dependencia que se va a inyectar en el controller
@Injectable()
export class ProductsService {
  constructor(
    //TypeORM crea una instancia de Repository<Product> cuando se inicializa la conexión a la base de datos, y Nest la inyecta en el service usando @InjectRepository()
    @InjectRepository(Product)
    //con esto puedo interactuar con el repo
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const category = await this.categoryRepository.findOneBy({
      id: createProductDto.categoryId,
    });
    if (!category) {
      const errors: string[] = [];
      errors.push('Not found category');
      throw new NotFoundException(errors);
    }
    return this.productRepository.save({
      ...createProductDto,
      category,
    });
  }

  async findAll(categoryId: number | null, take: number, skip: number) {
    //con esto evitamos repetir codigo
    //opciones de filtrado para la consulta
    const options: FindManyOptions<Product> = {
      relations: {
        category: true,
      },
      //crear una funcion donde el usuario escoja el tipo de orden
      order: {
        id: 'DESC',
      },
      take,
      skip,
    };
    //cuando se espeficique en la url el filtrado por categoria
    if (categoryId) {
      options.where = {
        category: {
          id: categoryId,
        },
      };
    }
    const [products, total] =
      await this.productRepository.findAndCount(options);
    return {
      products,
      total,
    };
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: {
        id,
      },
      //si hay mucha informacion relacionada , lo mejor es no usar relations
      relations: {
        category: true,
      },
    });
    if (!product) {
      throw new NotFoundException('Not Found Product');
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    //copiamos los datos de body y los asigamos al de la base de datos
    Object.assign(product, updateProductDto);

    if (updateProductDto.categoryId) {
      const category = await this.categoryRepository.findOneBy({
        id: updateProductDto.categoryId,
      });
      if (!category) {
        const errors: string[] = [];
        errors.push('Not found category');
        throw new NotFoundException(errors);
      }
      product.category = category;
    }
    return await this.productRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);

    await this.productRepository.remove(product);
    return 'Product deleted';
  }
}
