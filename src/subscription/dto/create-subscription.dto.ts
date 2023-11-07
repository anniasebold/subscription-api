import { IsBoolean, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateSubscriptionDto {
  @IsNotEmpty()
  @IsUUID()
  planId: string;

  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
}
