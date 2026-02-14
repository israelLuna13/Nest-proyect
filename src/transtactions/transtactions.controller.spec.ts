import { Test, TestingModule } from '@nestjs/testing';
import { TranstactionsController } from './transtactions.controller';
import { TranstactionsService } from './transtactions.service';

describe('TranstactionsController', () => {
  let controller: TranstactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TranstactionsController],
      providers: [TranstactionsService],
    }).compile();

    controller = module.get<TranstactionsController>(TranstactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
