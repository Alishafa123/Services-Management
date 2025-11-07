import { IsString, IsNotEmpty, IsDateString, IsInt } from 'class-validator';

export class CreateProfileDto {
  @IsInt()
  @IsNotEmpty({ message: 'User ID is required' })
  userId: number;

  @IsString()
  @IsNotEmpty({ message: 'Phone number is required' })
  phone: string;

  @IsString()
  @IsNotEmpty({ message: 'Address is required' })
  address: string;

  @IsDateString({}, { message: 'DOB must be a valid date (YYYY-MM-DD)' })
  dob: Date;
}
