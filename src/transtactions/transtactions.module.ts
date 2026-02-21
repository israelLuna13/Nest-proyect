import { Module } from '@nestjs/common';
import { TranstactionsService } from './transtactions.service';
import { TranstactionsController } from './transtactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  TransactionContents,
  Transtaction,
} from './entities/transtaction.entity';
import { Product } from '../products/entities/product.entity';
import { CouponsModule } from '../coupons/coupons.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transtaction, TransactionContents, Product]),
    CouponsModule,
  ],
  controllers: [TranstactionsController],
  providers: [TranstactionsService],
})
export class TranstactionsModule {}
