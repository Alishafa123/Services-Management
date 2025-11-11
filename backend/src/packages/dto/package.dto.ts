import { IsArray, IsNotEmpty, IsNumber, ArrayNotEmpty, ArrayMinSize, IsString } from 'class-validator';

export class CreatePackageDto {
  @IsNumber()
  userId: number;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  services: number[];

  @IsNumber()
  price: number;

  @IsString()
  @IsNotEmpty()
  name: string
}
