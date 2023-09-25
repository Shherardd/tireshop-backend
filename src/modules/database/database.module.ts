import { Module } from '@nestjs/common';
import { createConnection } from 'mysql2/promise';
import { MYSQL_CONNECTION } from 'src/constants';

@Module({
  providers: [
    {
      provide: MYSQL_CONNECTION, // Define un nombre para tu conexión, puedes usar cualquier nombre
      useFactory: async () => {
        const connection = await createConnection({
          host: 'localhost',
          user: 'root',
          password: 'dwrt',
          database: 'tireshop',
        });
        return connection;
      },
    },
  ],
  exports: [MYSQL_CONNECTION], // Exporta la conexión para que otros módulos puedan utilizarla
})
export class DatabaseModule {}
