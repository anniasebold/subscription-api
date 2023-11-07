import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { SubscriptionEntity } from './entities/subscription.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlanService } from 'src/plan/plan.service';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(SubscriptionEntity)
    private readonly subscriptionRepository: Repository<SubscriptionEntity>,
    private readonly planService: PlanService,
  ) {}

  async create(createSubscriptionDto: CreateSubscriptionDto) {
    await this.planService.findOneOrFail(createSubscriptionDto.planId);
    return await this.subscriptionRepository.save(
      this.subscriptionRepository.create(createSubscriptionDto),
    );
  }

  async findAll() {
    return await this.subscriptionRepository.find();
  }

  async findOneOrFail(id: string) {
    try {
      return await this.subscriptionRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Assinatura não encontrada.');
    }
  }

  async update(id: string, updateSubscriptionDto: UpdateSubscriptionDto) {
    const subscription = await this.findOneOrFail(id);

    this.subscriptionRepository.merge(subscription, updateSubscriptionDto);
    return await this.subscriptionRepository.save(subscription);
  }

  async remove(id: string) {
    const subscription = await this.findOneOrFail(id);
    subscription.isActive = false;
    await this.subscriptionRepository.save(subscription);
  }
}
