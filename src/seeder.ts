import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder/seeder.module';
import { SeederService } from './seeder/seeder.service';
/*
  Seeder Bootstrap Script

  This script creates a standalone NestJS application context without starting an HTTP server.
  Its purpose is to execute the SeederService to insert initial data into the database.

  Technical flow:

  1. createApplicationContext(SeederModule)
     - Initializes the NestJS Dependency Injection container
     - Loads all modules, providers, and database connections
     - Does NOT start an HTTP server

  2. app.get(SeederService)
     - Retrieves the SeederService instance from the DI container
     - NestJS injects all required dependencies (repositories, services, etc.)

  3. app.init()
     - Initializes the application lifecycle
     - Ensures database connections and providers are ready

  4. seeder.seed()
     - Executes the seeding logic
     - Inserts or modifies data in the database using repositories

  5. app.close()
     - Properly shuts down the application context
     - Closes database connections and frees resources

  This approach allows executing NestJS services in standalone scripts,
  commonly used for seeders, migrations, cron jobs, or CLI tasks.
*/
async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeederModule);
  const seeder = app.get(SeederService);
  await app.init();
  await seeder.seed();
  await app.close();
}
bootstrap();
