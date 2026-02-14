import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTranstactionDto } from './dto/create-transtaction.dto';
// import { UpdateTranstactionDto } from './dto/update-transtaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  TransactionContents,
  Transtaction,
} from './entities/transtaction.entity';
import { Between, FindManyOptions, Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { endOfDay, isValid, parseISO, startOfDay } from 'date-fns';

@Injectable()
export class TranstactionsService {
  constructor(
    @InjectRepository(Transtaction)
    private readonly transactionRepository: Repository<Transtaction>,
    @InjectRepository(TransactionContents)
    private readonly transactionContentsRepository: Repository<TransactionContents>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async create(createTranstactionDto: CreateTranstactionDto) {
    //creamos una transaccion porque si no hay inventario de algun producto, queremos que todo falle para que no siga la ejecucion del codigo
    //TypeORM opens a database transaction and provides a scoped EntityManager.
    //Abrimos una transacción de base de datos y usamos este manager( se puede usar el de transaction tambien, es igual) temporal para todas las operaciones
    await this.productRepository.manager.transaction(
      async (transactionEntityManager) => {
        //entity
        const transaction = new Transtaction();
        //total sale
        const total = createTranstactionDto.contents.reduce(
          (total, item) => total + item.quantity * item.price,
          0,
        );
        transaction.total = total;
        // await this.transactionRepository.save(transaction);
        for (const contents of createTranstactionDto.contents) {
          //find product across entityManager
          const product = await transactionEntityManager.findOneBy(Product, {
            id: contents.productId,
          });
          const errors: string[] = [];
          if (!product) {
            errors.push(`The product id ${contents.productId} does not exit`);
            throw new NotFoundException(errors);
          }
          if (contents.quantity > product.inventory) {
            errors.push(
              `the article ${product.name} exceeds the available quantity`,
            );
            throw new BadRequestException(errors);
          }
          product.inventory -= contents.quantity;

          //create transactionContents instance
          //entity
          const transactionContent = new TransactionContents();
          transactionContent.price = contents.price;
          transactionContent.product = product;
          transactionContent.quantity = contents.quantity;
          transactionContent.transaction = transaction;

          await transactionEntityManager.save(transaction);
          await transactionEntityManager.save(transactionContent);
          // await this.transactionContentsRepository.save({
          //   ...contents,
          //   transaction,
          //   product,
          // });
        }
      },
    );
    return 'Stocked sale';
  }

  findAll(transactionDate?: string) {
    const options: FindManyOptions<Transtaction> = {
      relations: {
        contents: true,
      },
    };
    if (transactionDate) {
      const date = parseISO(transactionDate);
      if (!isValid(date)) {
        throw new BadRequestException('Invalid Date');
      }
      const start = startOfDay(date);
      const end = endOfDay(date);
      options.where = {
        transactionDate: Between(start, end),
      };
    }
    return this.transactionRepository.find(options);
  }

  async findOne(id: number) {
    const transaction = await this.transactionRepository.findOne({
      where: {
        id,
      },
      relations: {
        contents: true,
      },
    });
    if (!transaction) {
      throw new NotFoundException('Not Found Transaction');
    }
    return transaction;
  }

  // update(id: number, updateTranstactionDto: UpdateTranstactionDto) {
  //   return `This action updates a #${id} transtaction`;
  // }

  async remove(id: number) {
    const transaction = await this.findOne(id);
    for (const contents of transaction.contents) {
      const product = await this.productRepository.findOneBy({
        id: contents.product.id,
      });
      if (!product) {
        throw new NotFoundException('Not Found product');
      }
      //if cancel / remove sale return  quantity to product inventory
      product.inventory += contents.quantity;
      await this.productRepository.save(product);
      const transactionContents =
        await this.transactionContentsRepository.findOneBy({ id: contents.id });
      if (!transactionContents) {
        throw new NotFoundException('Not Found Transaction contents');
      }
      await this.transactionContentsRepository.remove(transactionContents);
    }
    await this.transactionRepository.remove(transaction);
    return { message: `Transaction Deleted` };
  }
}
