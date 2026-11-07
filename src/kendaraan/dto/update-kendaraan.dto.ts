import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class UpdateKendaraanDto {
  @ValidateIf((_object, value) => value !== undefined)
  @IsString()
  @IsNotEmpty()
  platNomor?: string;

  @ValidateIf((_object, value) => value !== undefined)
  @IsString()
  @IsNotEmpty()
  merk?: string;
}