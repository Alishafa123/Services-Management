import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ServicesService } from './services.service';
import { Service } from './service.model';
import { CreateServiceDto,ServiceItemDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get(':userId')
  async getAll(
    @Param('userId') userId: string,
  ): Promise<{ onsite: ServiceItemDto[]; offsite: ServiceItemDto[] }> {
    return this.servicesService.getAllServices(+userId); // convert string to number
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
