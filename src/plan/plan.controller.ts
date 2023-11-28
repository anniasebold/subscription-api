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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('plans')
@ApiTags('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @ApiOperation({ summary: 'Busca todos planos cadastrados.' })
  @ApiBearerAuth('Autenticação JWT')
  @Get()
  findAll() {
    return this.planService.findAll();
  }

  @ApiOperation({ summary: 'Cadatra um novo plano.' })
  @ApiBearerAuth('Autenticação JWT')
  @Post()
  create(@Body() createPlanDto: CreatePlanDto) {
    return this.planService.create(createPlanDto);
  }

  @ApiOperation({ summary: 'Busca um plano pelo ID.' })
  @ApiBearerAuth('Autenticação JWT')
  @Get(':id')
  show(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.planService.findOneOrFail(id);
  }

  @ApiOperation({ summary: 'Atualiza um plano pelo ID.' })
  @ApiBearerAuth('Autenticação JWT')
  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePlanDto: UpdatePlanDto,
  ) {
    return this.planService.update(id, updatePlanDto);
  }

  @ApiOperation({ summary: 'Exclui um plano pelo ID.' })
  @ApiBearerAuth('Autenticação JWT')
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  softDelete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.planService.remove(id);
  }
}
