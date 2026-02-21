import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '..//categories/entities/category.entity';
import { Product } from '../products/entities/product.entity';
import { Repository, DataSource } from 'typeorm';
import { categories } from './data/categories';
import { products } from './data/products';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private dataSource: DataSource,
  ) {}
  // Lifecycle hook executed automatically when this service is instantiated by NestJS
  // and the module is initialized.
  //
  // Purpose:
  // This method resets the database and recreates all tables based on the registered entities.
  //
  // Technical flow:
  //
  // 1. this.dataSource
  //    - Retrieves the active TypeORM DataSource instance
  //    - Represents the database connection and entity metadata
  //
  // 2. dropDatabase()
  //    - Deletes the entire database schema
  //    - Removes all tables, data, constraints, and relations
  //    - Ensures a clean state before seeding
  //
  // 3. synchronize()
  //    - Recreates all tables automatically based on entity definitions
  //    - Uses entity metadata to generate the database schema
  //    - Ensures the database structure matches the current entity models
  //
  // This is commonly used in seeders to guarantee a fresh database state
  // before inserting initial or test data.
  async onModuleInit() {
    const connection = this.dataSource;
    await connection.dropDatabase();
    await connection.synchronize();
  }

  //set categories and product in databse
  async seed() {
    await this.categoryRepository.save(categories);
    for (const seedProduct of products) {
      const category = await this.categoryRepository.findOneBy({
        id: seedProduct.categoryId,
      });
      //validar categoria
      const product = new Product();
      product.name = seedProduct.name;
      product.image = seedProduct.image;
      product.price = seedProduct.price;
      product.inventory = seedProduct.inventory;
      product.category = category!;

      await this.productRepository.save(product);
    }
  }
}
