import { Test, TestingModule } from '@nestjs/testing';
import { PlanController } from '../plan.controller';
import { PlanService } from '../plan.service';
import { PlanEntity } from '../entities/plan.entity';
import { CreatePlanDto } from '../dto/create-plan.dto';
import { UpdatePlanDto } from '../dto/update-plan.dto';

const planEntityList: PlanEntity[] = [
  new PlanEntity({
    id: '1',
    name: 'Café normal',
    description: 'Café sem açúcar',
    price: 10.99,
  }),
  new PlanEntity({
    id: '2',
    name: 'Café premium',
    description: 'Café com açúcar',
    price: 12.99,
  }),
  new PlanEntity({
    id: '3',
    name: 'Café premium plus',
    description: 'Café com leite e açúcar',
    price: 14.99,
  }),
];

const newPlanEntity = new PlanEntity({
  id: '1',
  name: 'plan-test',
  description: 'description-test',
  price: 10,
});

const updatedPlanEntity = new PlanEntity({
  name: 'plan-test-updated',
  description: 'description-test-updated',
  price: 10,
});

describe('PlanController', () => {
  let planController: PlanController;
  let planService: PlanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanController],
      providers: [
        {
          provide: PlanService,
          useValue: {
            create: jest.fn().mockResolvedValue(newPlanEntity),
            findAll: jest.fn().mockResolvedValue(planEntityList),
            findOneOrFail: jest.fn().mockResolvedValue(planEntityList[0]),
            update: jest.fn().mockResolvedValue(updatedPlanEntity),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    planController = module.get<PlanController>(PlanController);
    planService = module.get<PlanService>(PlanService);
  });

  it('should be defined', () => {
    expect(planController).toBeDefined();
    expect(planService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a plan list entity successfully', async () => {
      const result = await planController.findAll();

      expect(result).toEqual(planEntityList);
      expect(planService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(planService, 'findAll').mockRejectedValueOnce(new Error());

      expect(planController.findAll()).rejects.toThrow();
    });
  });

  describe('create', () => {
    const body: CreatePlanDto = {
      name: 'plan-test',
      description: 'description-test',
      price: 10,
    };

    it('should return a new plan successfully', async () => {
      const result = await planController.create(body);

      expect(result).toEqual(newPlanEntity);
      expect(planService.create).toHaveBeenCalledTimes(1);
      expect(planService.create).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      jest.spyOn(planService, 'create').mockRejectedValueOnce(new Error());

      expect(planController.create(body)).rejects.toThrow();
    });
  });

  describe('show', () => {
    it('should get a plan successfully', async () => {
      const result = await planController.show('1');

      expect(result).toEqual(planEntityList[0]);
      expect(planService.findOneOrFail).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(planService, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());

      expect(planController.show('1')).rejects.toThrow();
    });
  });

  describe('update', () => {
    const body: UpdatePlanDto = {
      name: 'plan-test-updated',
      description: 'description-test-updated',
      price: 10,
    };

    it('should update a plan successfully', async () => {
      const result = await planController.update('1', body);

      expect(result).toEqual(updatedPlanEntity);
      expect(planService.update).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(planService, 'update').mockRejectedValueOnce(new Error());

      expect(planController.update('1', body)).rejects.toThrow();
    });
  });

  describe('softDelete', () => {
    it('should delete a plan successfully', async () => {
      const result = await planController.softDelete('1');

      expect(result).toBeUndefined();
      expect(planService.remove).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(planService, 'remove').mockRejectedValueOnce(new Error());

      expect(planController.softDelete('1')).rejects.toThrow();
    });
  });
});
