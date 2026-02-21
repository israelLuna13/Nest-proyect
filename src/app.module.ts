import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { typeOrmConfig } from './config/typeorm.config';
import { ProductsModule } from './products/products.module';
import { TranstactionsModule } from './transtactions/transtactions.module';
import { CouponsModule } from './coupons/coupons.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    //global enviroment  configuration
    ConfigModule.forRoot({ isGlobal: true }),
    //Database connection using async env-based configuration
    TypeOrmModule.forRootAsync({
      //config databse con env
      useFactory: typeOrmConfig,
      //permite usar process.env via ConfigService
      inject: [ConfigService],
    }),
    //Application feature modules
    CategoriesModule,
    ProductsModule,
    TranstactionsModule,
    CouponsModule,
  ],
})
export class AppModule {}
