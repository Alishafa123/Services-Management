import { Body, Controller, Get, Param, Post, Delete,Query } from '@nestjs/common';
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
async getAllPackages(@Query('userId') userId: string) {
  console.log('UserID query:', userId);
  return this.packageService.getAllPackages(+userId);
}

  @Delete(':id')
  async deletePackage(@Param('id') id: number) {
    return this.packageService.deletePackage(id);
  }
}
