import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './modules/client/client.module';
import { ProductModule } from './modules/product/product.module';
import { SaleModule } from './modules/sale/sale.module';
import { UserModule } from './modules/user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                uri:
                    'mongodb+srv://' +
                    configService.get<string>('MONGO_USER') +
                    ':' +
                    configService.get<string>('MONGO_PASSWORD') +
                    '@' +
                    configService.get<string>('MONGO_HOST') +
                    '/' +
                    configService.get<string>('MONGO_DATABASE'),
            }),
        }),
        ClientModule,
        ProductModule,
        SaleModule,
        UserModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
