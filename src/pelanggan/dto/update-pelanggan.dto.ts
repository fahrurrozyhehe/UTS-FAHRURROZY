import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class UpdatePelangganDto {
  @ValidateIf((_object, value) => value !== undefined)
  @IsString()
  @IsNotEmpty()
  nama?: string;
}