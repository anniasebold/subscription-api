import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('plans')
@ApiTags('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @ApiOperation({ summary: 'Busca todos planos cadastrados.' })
  @Get()
  findAll() {
    return this.planService.findAll();
  }

  @ApiOperation({ summary: 'Cadatra um novo plano.' })
  @Post()
  create(@Body() createPlanDto: CreatePlanDto) {
    return this.planService.create(createPlanDto);
  }

  @ApiOperation({ summary: 'Busca um plano pelo ID.' })
  @Get(':id')
  show(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.planService.findOneOrFail(id);
  }

  @ApiOperation({ summary: 'Atualiza um plano pelo ID.' })
  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePlanDto: UpdatePlanDto,
  ) {
    return this.planService.update(id, updatePlanDto);
  }

  @ApiOperation({ summary: 'Exclui um plano pelo ID.' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  softDelete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.planService.remove(id);
  }
}
