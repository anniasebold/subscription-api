import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionEntity } from './entities/subscription.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanModule } from 'src/plan/plan.module';

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionEntity]), PlanModule],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
})
export class SubscriptionModule {}
