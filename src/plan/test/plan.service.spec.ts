import { Test, TestingModule } from '@nestjs/testing';
import { PlanService } from '../plan.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PlanEntity } from '../entities/plan.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
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

const updatedPlanEntity = new PlanEntity({
  id: '1',
  name: 'Café normal atualizado',
  description: 'Café sem açúcar',
  price: 10.99,
});

describe('PlanService', () => {
  let planService: PlanService;
  let planRepository: Repository<PlanEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlanService,
        {
          provide: getRepositoryToken(PlanEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(planEntityList[0]),
            create: jest.fn().mockReturnValue(planEntityList[0]),
            find: jest.fn().mockResolvedValue(planEntityList),
            findOneOrFail: jest.fn().mockResolvedValue(planEntityList[0]),
            merge: jest.fn().mockReturnValue(updatedPlanEntity),
            softDelete: jest.fn().mockReturnValue(undefined),
          },
        },
      ],
    }).compile();

    planService = module.get<PlanService>(PlanService);
    planRepository = module.get<Repository<PlanEntity>>(
      getRepositoryToken(PlanEntity),
    );
  });

  it('should be defined', () => {
    expect(planService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a plan entity list successfully', async () => {
      const result = await planService.findAll();

      expect(result).toEqual(planEntityList);
      expect(planRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', async () => {
      jest.spyOn(planRepository, 'find').mockRejectedValueOnce(new Error());

      expect(planService.findAll()).rejects.toThrow();
    });
  });

  describe('findOneOrFail', () => {
    it('should return a plan successfully', async () => {
      const result = await planService.findOneOrFail('1');

      expect(result).toEqual(planEntityList[0]);
      expect(planRepository.findOneOrFail).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception', async () => {
      jest
        .spyOn(planRepository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());

      expect(planService.findOneOrFail('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    const body: CreatePlanDto = {
      name: 'Café normal',
      description: 'Café sem açúcar',
      price: 10.99,
    };

    it('should create a new plan successfully', async () => {
      const result = await planService.create(body);

      expect(result).toEqual(planEntityList[0]);
      expect(planRepository.create).toHaveBeenCalledTimes(1);
      expect(planRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', async () => {
      jest.spyOn(planRepository, 'save').mockRejectedValueOnce(new Error());

      expect(planService.create(body)).rejects.toThrow();
    });
  });

  describe('update', () => {
    const body: UpdatePlanDto = {
      name: 'Café normal atualizado',
      description: 'Café sem açúcar',
      price: 10.99,
    };

    it('should update a plan successfully', async () => {
      jest
        .spyOn(planRepository, 'save')
        .mockResolvedValueOnce(updatedPlanEntity);

      const result = await planService.update('1', body);

      expect(result).toEqual(updatedPlanEntity);
      expect(planRepository.merge).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception', async () => {
      jest
        .spyOn(planRepository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());

      expect(planService.update('1', body)).rejects.toThrow(NotFoundException);
    });

    it('should throw an exception', async () => {
      jest.spyOn(planRepository, 'save').mockRejectedValueOnce(new Error());

      expect(planService.update('1', body)).rejects.toThrow();
    });
  });

  describe('remove', () => {
    it('should delete a plan successfully', async () => {
      const result = await planService.remove('1');

      expect(result).toBeUndefined();
      expect(planRepository.softDelete).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception', async () => {
      jest
        .spyOn(planRepository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());

      expect(planService.remove('1')).rejects.toThrow(NotFoundException);
    });

    it('should throw an exception', async () => {
      jest
        .spyOn(planRepository, 'softDelete')
        .mockRejectedValueOnce(new Error());

      expect(planService.remove('1')).rejects.toThrow();
    });
  });
});
