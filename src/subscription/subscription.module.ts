import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionEntity } from './entities/subscription.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanService } from 'src/plan/plan.service';
import { PlanEntity } from 'src/plan/entities/plan.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubscriptionEntity]),
    TypeOrmModule.forFeature([PlanEntity]),
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionService, PlanService],
})
export class SubscriptionModule {}
