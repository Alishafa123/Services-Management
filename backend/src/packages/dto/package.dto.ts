import { IsArray, IsNotEmpty, IsNumber, ArrayNotEmpty, ArrayMinSize } from 'class-validator';

export class CreatePackageDto {
  @IsNumber()
  userId: number;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  services: number[];

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
