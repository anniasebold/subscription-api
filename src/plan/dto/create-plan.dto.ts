import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePlanDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
