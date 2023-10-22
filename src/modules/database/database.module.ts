import { Module } from '@nestjs/common';
import { createConnection } from 'mysql2/promise';
import { MYSQL_CONNECTION } from 'src/constants';

@Module({
  providers: [
    {
      provide: MYSQL_CONNECTION, // Define un nombre para tu conexión, puedes usar cualquier nombre
      useFactory: async () => {
        const connection = await createConnection({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
          port: parseInt(process.env.DB_PORT),
        });
        return connection;
      },
    },
  ],
  exports: [MYSQL_CONNECTION], // Exporta la conexión para que otros módulos puedan utilizarla
})
export class DatabaseModule {}
