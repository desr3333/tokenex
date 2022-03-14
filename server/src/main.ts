import { NestFactory } from '@nestjs/core';

import { AppModule } from './app';

const main = async () => {
  try {
    const PORT = process.env.PORT || 5000;

    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api/v1');

    app.listen(PORT).then(() => {
      console.log(`Server: Running (${PORT})`);
    });
  } catch (e) {
    console.log({ e });
  }
};

main();
