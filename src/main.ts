import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { WrapResposeInterceptor } from './common/interceptors/wrap-respose.interceptor';
import { SwaggerModule,DocumentBuilder } from "@nestjs/swagger";
// import { AuthGuard } from './common/gurds/auth.guard';

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
  // app.useGlobalGuards(new AuthGuard())
  app.useGlobalInterceptors(new WrapResposeInterceptor(),new TimeoutInterceptor())


  const options = new DocumentBuilder()
  .setTitle('Coffees')
  .setDescription('The Coffees API description')
  .setVersion('1.0')
  .build();

  const document =SwaggerModule.createDocument(app,options)
  SwaggerModule.setup('api',app,document)

  await app.listen(3000);
}
bootstrap();
