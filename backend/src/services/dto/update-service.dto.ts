import { IsEnum, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { ServiceType } from '../service.model';

export class UpdateServiceDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(ServiceType)
  type?: ServiceType;

  @IsOptional()
  @IsNumber()
  @IsPositive({ message: 'Price must be a positive number' })
  price?: number;
}
