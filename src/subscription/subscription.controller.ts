import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller('subscription')
@ApiTags('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @ApiOperation({ summary: 'Cadastra uma nova assinatura.' })
  @Post()
  create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionService.create(createSubscriptionDto);
  }

  @ApiOperation({ summary: 'Busca todas as assinaturas.' })
  @Get()
  findAll() {
    return this.subscriptionService.findAll();
  }

  @ApiOperation({ summary: 'Busca uma assinatura pelo ID.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscriptionService.findOneOrFail(id);
  }

  @ApiOperation({ summary: 'Atualiza uma assinatura pelo ID.' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
  ) {
    return this.subscriptionService.update(id, updateSubscriptionDto);
  }

  @ApiOperation({
    summary:
      'Todos os dias roda um Cron Job que verifica se a assinatura expirou e se sim a desativa.',
  })
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  @Post('/expiration')
  expirationSubscriptions() {
    return this.subscriptionService.checkSubscriptionExpiration();
  }
}
