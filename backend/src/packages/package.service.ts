import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Package } from './package.model';
import { CreatePackageDto } from './dto/package.dto';

@Injectable()
export class PackageService {
  constructor(
    @InjectModel(Package)
    private readonly packageModel: typeof Package,
  ) {}

  async createPackage(dto: CreatePackageDto) {
    return await this.packageModel.create({
      userId: dto.userId,
      services: dto.services,
      price: dto.price,
    } as any);
  }

  async getAllPackages() {
    return await this.packageModel.findAll({ include: { all: true } });
  }

  async getPackageById(id: number) {
    const pkg = await this.packageModel.findByPk(id, { include: { all: true } });
    if (!pkg) throw new NotFoundException('Package not found');
    return pkg;
  }

  async deletePackage(id: number) {
    const deleted = await this.packageModel.destroy({ where: { id } });
    if (!deleted) throw new NotFoundException('Package not found');
  }
}
