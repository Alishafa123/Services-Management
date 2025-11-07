import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/users.model';
import { Profile } from "./profiles/profile.model"
import { Service } from './services/service.model';
import { Package } from "./packages/package.model"
import { UsersController } from "./users/users.controller"
import { UsersService } from "./users/users.services"
import { ProfilesService } from "./profiles/profiles.service"
import { ProfilesController } from "./profiles/profiles.controller"
import { ServicesService } from "./services/services.service"
import { ServicesController } from "./services/services.controller"
import { PackageService } from "./packages/package.service"
import { PackageController } from "./packages/package.controller"
import { PricingService } from "./pricing/pricing.service"
import { PricingController } from "./pricing/pricing.controller"

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1122',
      database: 'Services',
      autoLoadModels: true,
      synchronize: true,
      models: [User, Profile, Service, Package],
    }),
    SequelizeModule.forFeature([User, Profile, Service, Package]),
  ],
  controllers: [AppController, UsersController, ProfilesController, ServicesController, PackageController, PricingController],
  providers: [AppService, UsersService, ProfilesService, ServicesService, PackageService, PricingService],
})
export class AppModule { }
