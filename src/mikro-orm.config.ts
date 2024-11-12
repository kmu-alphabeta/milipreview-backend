import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';
import 'dotenv/config';

const config: Options = {
  entities: ['./dist/entities'],
  entitiesTs: ['./src/entities'],
  host: process.env.POSTGRES_HOST,
  port: Number.parseInt(process.env.POSTGRES_PORT),
  dbName: process.env.POSTGRES_NAME,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASS,
  driver: PostgreSqlDriver,
  driverOptions: {
    connection: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};

export default config;
