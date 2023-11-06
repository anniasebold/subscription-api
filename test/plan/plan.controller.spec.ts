import { Test, TestingModule } from '@nestjs/testing';
import { PlanController } from 'src/plan/plan.controller';
import { PlanService } from 'src/plan/plan.service';

describe('PlanController', () => {
  let controller: PlanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanController],
      providers: [PlanService],
    }).compile();

    controller = module.get<PlanController>(PlanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
