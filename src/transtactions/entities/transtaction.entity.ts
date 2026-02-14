import { Product } from '../../products/entities/product.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
// there can be two entitys class in a single entity.ts file only  if these two entity have relationship between them
@Entity()
export class Transtaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal')
  total: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  transactionDate: Date;

  //OneToMany no column, just navigation
  @OneToMany(
    () => TransactionContents,
    (transaction) => transaction.transaction,
  )
  contents: TransactionContents[];
}

@Entity()
export class TransactionContents {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  quantity: number;

  @Column('decimal')
  price: number;

  //eager awlays brings products
  //ManyToOne crate a foreing key column
  @ManyToOne(() => Product, (product) => product.id, {
    eager: true,
    cascade: true,
  })
  product: Product;

  @ManyToOne(() => Transtaction, (transaction) => transaction.contents, {
    cascade: true,
  })
  transaction: Transtaction;
}
