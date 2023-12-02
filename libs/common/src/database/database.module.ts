import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {ModelDefinition, MongooseModule} from '@nestjs/mongoose'
@Module({
    imports:[
        MongooseModule.forRootAsync({
        imports:[],
        useFactory:(configService:ConfigService)=>({
            uri:configService.get('MONGODB_URL')
        }),
        inject:[ConfigService]
    })],
    exports:[]
})
export class DatabaseModule {
    static forFeature(models:ModelDefinition[]){
        return MongooseModule.forFeature(models)
    }
}
