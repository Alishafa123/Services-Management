import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Service } from '../services/service.model';
import { Package } from '../packages/package.model';
import { UpdatePricingDto } from './dto/update-pricing.dto';

@Injectable()
export class PricingService {
  constructor(
    @InjectModel(Service)
    private readonly serviceModel: typeof Service,
    @InjectModel(Package)
    private readonly packageModel: typeof Package,
  ) {}

  async getPricingByUserId(userId: number) {
    const services = await this.serviceModel.findAll({
      where: { userId },
      attributes: ['id', 'name', 'type', 'price'],
    });

    const packages = await this.packageModel.findAll({
      where: { userId },
      attributes: ['id', 'services', 'price'],
    });

    return {
      services,
      packages,
    };
  }

  async updatePricing(userId: number, dto: UpdatePricingDto) {
    const updatedServices: Service[] = [];
    const updatedPackages: Package[] = [];

    for (const servicePrice of dto.services) {
      const service = await this.serviceModel.findOne({
        where: { id: servicePrice.id, userId },
      });

      if (!service) {
        throw new NotFoundException(`Service with id ${servicePrice.id} not found`);
      }

      await service.update({ price: servicePrice.price });
      updatedServices.push(service);
    }

    for (const packagePrice of dto.packages) {
      const pkg = await this.packageModel.findOne({
        where: { id: packagePrice.id, userId },
      });

      if (!pkg) {
        throw new NotFoundException(`Package with id ${packagePrice.id} not found`);
      }

      await pkg.update({ price: packagePrice.price });
      updatedPackages.push(pkg);
    }

    return {
      services: updatedServices,
      packages: updatedPackages,
    };
  }
}
