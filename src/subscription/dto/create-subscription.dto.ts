import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateSubscriptionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  planId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  expirationDate: Date;
}
