import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ServicesService } from './services.service';
import { Service } from './service.model';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  async getAll(): Promise<Service[]> {
    return this.servicesService.getAllServices();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Service> {
    return this.servicesService.getServiceById(id);
  }

  @Post('bulk')
  async createMultiple(@Body() body: CreateServiceDto): Promise<Service[]> {
    return this.servicesService.createMultipleServices(body);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto): Promise<Service> {
    return this.servicesService.updateService(id, updateServiceDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    await this.servicesService.deleteService(id);
    return { message: 'Service deleted successfully' };
  }
}
