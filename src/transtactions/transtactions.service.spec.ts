import { Test, TestingModule } from '@nestjs/testing';
import { TranstactionsService } from './transtactions.service';

describe('TranstactionsService', () => {
  let service: TranstactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TranstactionsService],
    }).compile();

    service = module.get<TranstactionsService>(TranstactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
