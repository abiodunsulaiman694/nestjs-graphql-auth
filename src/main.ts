import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';

dotenv.config();
const port = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      validationError: {
        target: false,
      },
      transform: true,
    }),
  );
  app.enableCors();
  await app.listen(3000);
  Logger.log(
    `Server running on http://localhost:${port} in ${process.env.NODE_ENV} mode \nPress CTRL-C to stop`,
    'Bootstrap',
  );
}
bootstrap();
