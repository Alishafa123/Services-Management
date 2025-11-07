import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsPositive, ValidateNested } from 'class-validator';

class ServicePriceDto {
  @IsNumber()
  id: number;

  @IsNumber()
  @IsPositive({ message: 'Price must be a positive number' })
  price: number;
}

class PackagePriceDto {
  @IsNumber()
  id: number;

  @IsNumber()
  @IsPositive({ message: 'Price must be a positive number' })
  price: number;
}

export class UpdatePricingDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServicePriceDto)
  services: ServicePriceDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PackagePriceDto)
  packages: PackagePriceDto[];
}
