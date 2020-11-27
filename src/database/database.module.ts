import { DynamicModule, Module } from '@nestjs/common';
import { createConnection ,ConnectionOptions} from 'typeorm';

// static module 
@Module({})

// dynamic Module
export class DatabaseModule {
    static register(option:ConnectionOptions):DynamicModule{
        return {
            module : DatabaseModule,
            providers:[{
                provide:'CONNECTION',
                useValue:createConnection(option)
            }]
        }
    }
}
