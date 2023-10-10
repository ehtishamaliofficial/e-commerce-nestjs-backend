import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Disable201StatusInterceptor } from './interceptors/disable201Status.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalInterceptors(new Disable201StatusInterceptor());

  const option = new DocumentBuilder();
  const options = new DocumentBuilder()
    .setTitle('E-commerce API')
    .setDescription('The E-commerce API description')
    .setVersion('1.0')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .setContact(
      'Aurelio',
      'https://github.com/aurelio',
      'https://github.com/aurelio',
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
        description: 'JWT Authorization header using the Bearer scheme.',
      },
      'JWT',
    )
    .addServer('http://localhost:3000')
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    deepScanRoutes: true,
  });

  SwaggerModule.setup('swagger/api/docs', app, document);
  await app.listen(3000);
}
bootstrap();
