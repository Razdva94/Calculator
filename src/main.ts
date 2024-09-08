import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { startCalculator } from './startCalculator';
import { AppModule } from './app.module';

async function start() {
  const PORT = process.env.PORT || 5010;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  try {
    await app.listen(PORT, () =>
      console.log(`Server started on port = ${PORT}`),
    );
    startCalculator();
  } catch (error) {
    console.error('Произошла ошибка при запуске приложения:', error);
  }
}

start();
