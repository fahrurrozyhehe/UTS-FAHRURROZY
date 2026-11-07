import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePelangganDto {
  @IsString()
  @IsNotEmpty()
  nama: string; // Contoh input: "Budi 123" (menyisipkan NIM)
}