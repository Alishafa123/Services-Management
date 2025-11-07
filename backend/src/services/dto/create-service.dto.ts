import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString, ValidateNested } from 'class-validator';

class ServiceItemDto {
  @IsString()
  @IsNotEmpty({ message: 'Service name is required' })
  name: string;

  @IsNumber()
  @IsPositive({ message: 'Price must be a positive number' })
  price: number;
}

export class CreateServiceDto {
  @IsNumber()
  @IsPositive({ message: 'User ID must be a valid number' })
  userId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServiceItemDto)
  onsite: ServiceItemDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServiceItemDto)
  offsite: ServiceItemDto[];
}
