import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './common/gurds/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      disableErrorMessages: false,
      transform: true,
      transformOptions: {
        // for type conversion
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalGuards(new AuthGuard())
  await app.listen(3000);
}
bootstrap();
