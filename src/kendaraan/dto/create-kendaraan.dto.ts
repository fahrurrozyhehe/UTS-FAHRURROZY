import { IsString, IsNotEmpty } from 'class-validator';

export class CreateKendaraanDto {
  @IsString()
  @IsNotEmpty()
  platNomor: string; // Contoh: "AB 123 CD"

  @IsString()
  @IsNotEmpty()
  merk: string;
}