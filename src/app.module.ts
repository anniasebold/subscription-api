import { MiddlewareConsumer, Module } from '@nestjs/common';
import { PlanModule } from './plan/plan.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SubscriptionModule } from './subscription/subscription.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthMiddleware } from './auth/auth.middleware';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.get('DB_HOST', 'localhost'),
        port: Number(configService.get('DB_PORT', 3306)),
        username: configService.get('DB_USERNAME', 'root'),
        password: configService.get('DB_PASSWORD', '123'),
        database: configService.get('DB_DATABASE', 'facoffee'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    PlanModule,
    SubscriptionModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
