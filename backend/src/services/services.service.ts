import { Injectable, NotFoundException } from '@nestjs/common';
import { Service, ServiceType } from './service.model';
import { CreateServiceDto,ServiceItemDto } from './dto/create-service.dto';

@Injectable()
export class ServicesService {
  
  async getAllServices(userId: number): Promise<{ onsite: ServiceItemDto[], offsite: ServiceItemDto[] }> {
    const services = await Service.findAll({
      where: { userId },
      include: { all: true },
      raw: true,
    });

    const onsite = services
      .filter(s => s.type === 'onsite')
      .map(s => ({ id: s.id, name: s.name, price: s.price })); // ✅ include id

    const offsite = services
      .filter(s => s.type === 'offsite')
      .map(s => ({ id: s.id, name: s.name, price: s.price })); // ✅ include id

    return { onsite, offsite };
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
