import { Sequelize } from 'sequelize-typescript';
import { ENTITIES } from './entities';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'Duetodata@123',
        database: 'asp',
      });
      sequelize.addModels([...ENTITIES]);
      await sequelize.sync();
      return sequelize;
    },
  },
];