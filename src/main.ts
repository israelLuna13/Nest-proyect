import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

const PORT = process.env.PORT || 300;
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //forzar la vsalidacion de dto
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  //Enabled read public images
  app.useStaticAssets(join(__dirname, '../public'));
  await app.listen(PORT ?? 3000);
}
bootstrap();
