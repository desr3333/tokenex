import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from '@modules/app';
import { CoinbaseExchangeService } from '@modules/coinbase-exchange/coinbase-exchange.service';

const main = async () => {
  try {
    const PORT = process.env.PORT || 5000;

    // Nest.js App
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api/v1');

    app.listen(PORT, '0.0.0.0').then(() => {
      console.log(`Server: Running (${PORT})`);

      // Testing
      const coinbase = new CoinbaseExchangeService();

      coinbase.getProfiles().then((r) => console.log(r));
    });

    // Swagger
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Tokenex API')
      .setVersion('1.0')
      .build();

    SwaggerModule.setup(
      'docs',
      app,
      SwaggerModule.createDocument(app, swaggerConfig),
    );
  } catch (e) {
    console.log({ e });
  }
};

main();
