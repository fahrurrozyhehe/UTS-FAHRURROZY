import {
  Field,
  Float,
  GraphQLISODateTime,
  Int,
  ObjectType,
  InputType,
} from '@nestjs/graphql';
import { IsDateString, IsInt, IsNotEmpty, IsNumber } from 'class-validator';

@ObjectType('Pelanggan')
export class PelangganType {
  @Field(() => Int)
  id!: number;

  @Field()
  nama!: string;
}

@ObjectType('Kendaraan')
export class KendaraanType {
  @Field(() => Int)
  id!: number;

  @Field()
  platNomor!: string;

  @Field()
  merk!: string;
}

@ObjectType('Penyewaan')
export class PenyewaanType {
  @Field(() => Int)
  id!: number;

  @Field(() => GraphQLISODateTime)
  tanggal_sewa!: Date;

  @Field(() => Float)
  total_biaya!: number;

  @Field(() => PelangganType)
  pelanggan!: PelangganType;

  @Field(() => KendaraanType)
  kendaraan!: KendaraanType;
}

@InputType('CreatePenyewaanInput')
export class CreatePenyewaanInput {
  @Field()
  @IsDateString()
  @IsNotEmpty()
  tanggal_sewa!: string;

  @Field(() => Float)
  @IsNumber()
  @IsNotEmpty()
  total_biaya!: number;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  pelangganId!: number;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  kendaraanId!: number;
}
