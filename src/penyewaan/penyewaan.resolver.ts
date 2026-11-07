import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PenyewaanService } from './penyewaan.service.js';
import {
  CreatePenyewaanInput,
  PenyewaanType,
} from './graphql/penyewaan.types.js';

@Resolver(() => PenyewaanType)
export class PenyewaanResolver {
  constructor(private readonly penyewaanService: PenyewaanService) {}

  @Query(() => [PenyewaanType], { name: 'penyewaanList' })
  penyewaanList() {
    return this.penyewaanService.findAll();
  }

  @Query(() => PenyewaanType, { name: 'penyewaanById', nullable: true })
  penyewaanById(@Args('id', { type: () => Int }) id: number) {
    return this.penyewaanService.findOne(id);
  }

  @Mutation(() => PenyewaanType, { name: 'createPenyewaan' })
  createPenyewaan(@Args('createPenyewaanInput') input: CreatePenyewaanInput) {
    return this.penyewaanService.create(input);
  }
}
