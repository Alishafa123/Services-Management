import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { PackageService } from './package.service';
import { CreatePackageDto } from './dto/package.dto';

@Controller('packages')
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @Post()
  async createPackage(@Body() dto: CreatePackageDto) {
    return this.packageService.createPackage(dto);
  }

  @Get()
  async getAllPackages() {
    return this.packageService.getAllPackages();
  }

  @Get(':id')
  async getPackageById(@Param('id') id: number) {
    return this.packageService.getPackageById(id);
  }

  @Delete(':id')
  async deletePackage(@Param('id') id: number) {
    return this.packageService.deletePackage(id);
  }
}
