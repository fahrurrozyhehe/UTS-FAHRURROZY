import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  ValidateIf,
} from 'class-validator';

export class UpdatePenyewaanDto {
  @ValidateIf((_object, value) => value !== undefined)
  @IsDateString()
  @IsNotEmpty()
  tanggal_sewa?: string;

  @ValidateIf((_object, value) => value !== undefined)
  @IsNumber()
  @IsNotEmpty()
  total_biaya?: number;

  @ValidateIf((_object, value) => value !== undefined)
  @IsInt()
  @IsNotEmpty()
  pelangganId?: number;

  @ValidateIf((_object, value) => value !== undefined)
  @IsInt()
  @IsNotEmpty()
  kendaraanId?: number;
}