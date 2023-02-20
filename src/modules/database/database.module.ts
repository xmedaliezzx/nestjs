import { Module } from '@nestjs/common';
import { databaseProviders } from './db_providers';

@Module({
    providers:[...databaseProviders],
    exports:[...databaseProviders]
})
export class DatabaseModule {}
