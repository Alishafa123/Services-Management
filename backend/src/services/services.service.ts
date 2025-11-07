import { Injectable, NotFoundException } from '@nestjs/common';
import { Service, ServiceType } from './service.model';
import { CreateServiceDto } from './dto/create-service.dto';

@Injectable()
export class ServicesService {
  async getAllServices(): Promise<Service[]> {
    return await Service.findAll<Service>({ include: { all: true } });
  }

  async getServiceById(id: string): Promise<Service> {
    const service = await Service.findByPk<Service>(id, { include: { all: true } });
    if (!service) throw new NotFoundException('Service not found');
    return service;
  }

  async createMultipleServices(data: CreateServiceDto): Promise<Service[]> {
    const { userId, onsite, offsite } = data;
    const allServices: Service[] = [];

    for (const service of onsite) {
      const created = await Service.create<Service>({
        name: service.name,
        price: service.price,
        type: ServiceType.ONSITE,
        userId,
      } as any);
      allServices.push(created);
    }

    for (const service of offsite) {
      const created = await Service.create<Service>({
        name: service.name,
        price: service.price,
        type: ServiceType.OFFSITE,
        userId,
      } as any);
      allServices.push(created);
    }

    return allServices;
  }

  async updateService(id: string, data: { name?: string; type?: ServiceType; price?: number }): Promise<Service> {
    const service = await Service.findByPk<Service>(id);
    if (!service) throw new NotFoundException('Service not found');
    return await service.update(data);
  }

  async deleteService(id: string): Promise<void> {
    const deleted = await Service.destroy({ where: { id } });
    if (!deleted) throw new NotFoundException('Service not found');
  }
}
