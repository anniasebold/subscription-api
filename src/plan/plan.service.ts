import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { Repository } from 'typeorm';
import { PlanEntity } from './entities/plan.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(PlanEntity)
    private readonly planRepository: Repository<PlanEntity>,
  ) {}

  async findAll(): Promise<PlanEntity[]> {
    return await this.planRepository.find();
  }

  async findOneOrFail(id: string) {
    try {
      return await this.planRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async create(createPlanDto: CreatePlanDto) {
    return await this.planRepository.save(
      this.planRepository.create(createPlanDto),
    );
  }

  async update(id: string, updatePlanDto: UpdatePlanDto) {
    const plan = await this.findOneOrFail(id);

    this.planRepository.merge(plan, updatePlanDto);
    return await this.planRepository.save(plan);
  }

  async remove(id: string) {
    await this.findOneOrFail(id);
    await this.planRepository.softDelete(id);
  }
}
