import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../config/typeorm.config';
import { Category } from '../categories/entities/category.entity';
import { Product } from '../products/entities/product.entity';

@Module({
  imports: [
    //configuracion variables de entorno
    //config module disponible en toda la app
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      //config databse con env
      useFactory: typeOrmConfig,
      //permite usar process.env via ConfigService
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Category, Product]),
  ],
  providers: [SeederService],
})
export class SeederModule {}
