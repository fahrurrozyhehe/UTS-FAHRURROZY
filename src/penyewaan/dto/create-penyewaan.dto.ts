import { IsInt, IsNumber, IsNotEmpty, IsDateString } from 'class-validator';

export class CreatePenyewaanDto {
  @IsDateString()
  @IsNotEmpty()
  tanggal_sewa: string;

  @IsNumber()
  @IsNotEmpty()
  total_biaya: number; // Contoh: 150123 (menyisipkan NIM)

  @IsInt()
  @IsNotEmpty()
  pelangganId: number;

  @IsInt()
  @IsNotEmpty()
  kendaraanId: number;
}