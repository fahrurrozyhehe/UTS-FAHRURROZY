import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from './../src/app.module.js';
import { PrismaService } from './../src/prisma/prisma.service.js';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const kendaraan = { id: 1, platNomor: 'B 1234 CD', merk: 'Toyota' };
    const pelanggan = { id: 1, nama: 'Budi' };
    const penyewaan = {
      id: 1,
      tanggal_sewa: '2026-11-06T00:00:00.000Z',
      total_biaya: 100000,
      pelangganId: 1,
      kendaraanId: 1,
    };
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue({
        kendaraan: {
          create: vi.fn().mockResolvedValue(kendaraan),
          findMany: vi.fn().mockResolvedValue([kendaraan]),
          findUnique: vi.fn().mockResolvedValue(kendaraan),
          update: vi.fn().mockResolvedValue(kendaraan),
          delete: vi.fn().mockResolvedValue(kendaraan),
        },
        pelanggan: {
          create: vi.fn().mockResolvedValue(pelanggan),
          findMany: vi.fn().mockResolvedValue([pelanggan]),
          findUnique: vi.fn().mockResolvedValue(pelanggan),
          update: vi.fn().mockResolvedValue(pelanggan),
          delete: vi.fn().mockResolvedValue(pelanggan),
        },
        penyewaan: {
          create: vi.fn().mockResolvedValue(penyewaan),
          findMany: vi.fn().mockResolvedValue([penyewaan]),
          findUnique: vi.fn().mockResolvedValue(penyewaan),
          update: vi.fn().mockResolvedValue(penyewaan),
          delete: vi.fn().mockResolvedValue(penyewaan),
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('rejects a non-numeric vehicle id', () => {
    return request(app.getHttpServer()).get('/kendaraan/not-an-id').expect(400);
  });

  it('rejects a vehicle without required fields', () => {
    return request(app.getHttpServer()).post('/kendaraan').send({}).expect(400);
  });

  it('returns success messages for vehicle methods', async () => {
    const routes = [
      {
        response: await request(app.getHttpServer())
          .post('/kendaraan')
          .send({ platNomor: 'B 1234 CD', merk: 'Toyota' }),
        message: 'Kendaraan berhasil ditambahkan',
        data: { id: 1, platNomor: 'B 1234 CD', merk: 'Toyota' },
      },
      {
        response: await request(app.getHttpServer()).get('/kendaraan'),
        message: 'Daftar kendaraan berhasil diambil',
        data: [{ id: 1, platNomor: 'B 1234 CD', merk: 'Toyota' }],
      },
      {
        response: await request(app.getHttpServer()).get('/kendaraan/1'),
        message: 'Detail kendaraan berhasil diambil',
        data: { id: 1, platNomor: 'B 1234 CD', merk: 'Toyota' },
      },
      {
        response: await request(app.getHttpServer())
          .patch('/kendaraan/1')
          .send({ merk: 'Toyota' }),
        message: 'Kendaraan berhasil diperbarui',
        data: { id: 1, platNomor: 'B 1234 CD', merk: 'Toyota' },
      },
      {
        response: await request(app.getHttpServer()).delete('/kendaraan/1'),
        message: 'Kendaraan berhasil dihapus',
        data: { id: 1, platNomor: 'B 1234 CD', merk: 'Toyota' },
      },
    ];

    for (const { response, message, data } of routes) {
      expect(response.status).toBeGreaterThanOrEqual(200);
      expect(response.status).toBeLessThan(300);
      expect(response.body).toEqual({ message, data });
    }
  });

  it('returns success messages for customer methods', async () => {
    const routes = [
      {
        response: await request(app.getHttpServer())
          .post('/pelanggan')
          .send({ nama: 'Budi' }),
        message: 'Pelanggan berhasil ditambahkan',
        data: { id: 1, nama: 'Budi' },
      },
      {
        response: await request(app.getHttpServer()).get('/pelanggan'),
        message: 'Daftar pelanggan berhasil diambil',
        data: [{ id: 1, nama: 'Budi' }],
      },
      {
        response: await request(app.getHttpServer()).get('/pelanggan/1'),
        message: 'Detail pelanggan berhasil diambil',
        data: { id: 1, nama: 'Budi' },
      },
      {
        response: await request(app.getHttpServer())
          .patch('/pelanggan/1')
          .send({ nama: 'Budi' }),
        message: 'Pelanggan berhasil diperbarui',
        data: { id: 1, nama: 'Budi' },
      },
      {
        response: await request(app.getHttpServer()).delete('/pelanggan/1'),
        message: 'Pelanggan berhasil dihapus',
        data: { id: 1, nama: 'Budi' },
      },
    ];

    for (const { response, message, data } of routes) {
      expect(response.status).toBeGreaterThanOrEqual(200);
      expect(response.status).toBeLessThan(300);
      expect(response.body).toEqual({ message, data });
    }
  });

  it('returns success messages for rental methods', async () => {
    const rental = {
      id: 1,
      tanggal_sewa: '2026-11-06T00:00:00.000Z',
      total_biaya: 100000,
      pelangganId: 1,
      kendaraanId: 1,
    };
    const routes = [
      {
        response: await request(app.getHttpServer())
          .post('/penyewaan')
          .send({
            tanggal_sewa: '2026-11-06T00:00:00.000Z',
            total_biaya: 100000,
            pelangganId: 1,
            kendaraanId: 1,
          }),
        message: 'Penyewaan berhasil ditambahkan',
        data: rental,
      },
      {
        response: await request(app.getHttpServer()).get('/penyewaan'),
        message: 'Daftar penyewaan berhasil diambil',
        data: [rental],
      },
      {
        response: await request(app.getHttpServer()).get('/penyewaan/1'),
        message: 'Detail penyewaan berhasil diambil',
        data: rental,
      },
      {
        response: await request(app.getHttpServer())
          .patch('/penyewaan/1')
          .send({ total_biaya: 100000 }),
        message: 'Penyewaan berhasil diperbarui',
        data: rental,
      },
      {
        response: await request(app.getHttpServer()).delete('/penyewaan/1'),
        message: 'Penyewaan berhasil dihapus',
        data: rental,
      },
    ];

    for (const { response, message, data } of routes) {
      expect(response.status).toBeGreaterThanOrEqual(200);
      expect(response.status).toBeLessThan(300);
      expect(response.body).toEqual({ message, data });
    }
  });

  afterEach(async () => {
    await app.close();
  });
});
