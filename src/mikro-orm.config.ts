import { defineConfig } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import { SeedManager } from '@mikro-orm/seeder';

const options = defineConfig({
  dbName: process.env.MIKRO_ORM_POSTGRES_DATABASE,
  user: process.env.MIKRO_ORM_POSTGRES_USERNAME,
  password: process.env.MIKRO_ORM_POSTGRES_PASSWORD,
  host: process.env.MIKRO_ORM_POSTGRES_HOST,
  port: Number.parseInt(process.env.MIKRO_ORM_POSTGRES_PORT as string, 10),

  entities: ['./dist/entities/*.entity.js'],
  entitiesTs: ['./src/entities/*.entity.ts'],

  implicitTransactions: true,

  extensions: [Migrator, SeedManager],
  migrations: {
    path: './src/.database/migrations',
    glob: '*.ts',
    emit: 'ts',

    snapshot: false,
  },

  seeder: {
    path: './src/.database/seeders',
    glob: '*.ts',
    emit: 'ts',
  },
});

export default options;
