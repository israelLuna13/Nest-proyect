import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { typeOrmConfig } from './config/typeorm.config';
import { ProductsModule } from './products/products.module';
import { TranstactionsModule } from './transtactions/transtactions.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
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
    CategoriesModule,
    ProductsModule,
    TranstactionsModule,
  ],
})
export class AppModule {}
