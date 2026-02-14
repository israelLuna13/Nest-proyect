import { Module } from '@nestjs/common';
import { TranstactionsService } from './transtactions.service';
import { TranstactionsController } from './transtactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionContents, Transtaction } from './entities/transtaction.entity';
import { Product } from 'src/products/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transtaction, TransactionContents, Product]),
  ],
  controllers: [TranstactionsController],
  providers: [TranstactionsService],
})
export class TranstactionsModule {}
