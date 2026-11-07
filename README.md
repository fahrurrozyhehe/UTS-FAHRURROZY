<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Database setup

The API uses MySQL through Prisma. Set `DATABASE_URL` to a MySQL connection
string before starting the application, then generate the Prisma client:

```bash
$ npm run prisma:generate
$ npx prisma migrate dev
```

The initial migration is already included. Run `npx prisma migrate dev` to
apply it to your development database; do not pass `--name init` unless you
intend to create an additional migration.

## Menjalankan dengan Docker

Pastikan Docker Desktop sudah berjalan. File `setup.env` berisi konfigurasi
database lokal untuk container dan tidak dimasukkan ke Git. Jika file tersebut
belum ada, salin template:

```powershell
Copy-Item setup.env.example setup.env
```

Bangun image API dan jalankan API bersama MySQL:

```bash
docker compose --env-file setup.env up --build -d
```

Container API menggunakan port `3000` di dalam Docker dan port `3001` di
komputer host secara default. Pemisahan ini mencegah bentrok jika API lokal
masih berjalan di port `3000`. Container menunggu MySQL siap, menjalankan
migrasi Prisma, lalu memulai API. Buka `http://localhost:3001` atau
`http://localhost:3001/graphql`.

Periksa status container dan log API dengan:

```bash
docker compose --env-file setup.env ps
docker compose --env-file setup.env logs --tail=80 api
```

Untuk menghentikan container:

```bash
docker compose --env-file setup.env down
```

Data MySQL disimpan di volume Docker dan tetap ada setelah container dihentikan.
Ubah nilai di `setup.env` untuk konfigurasi lokal; jangan gunakan kata sandi
contoh untuk deployment produksi.

## GraphQL API

Saat dijalankan melalui Docker, GraphQL API tersedia di
`http://localhost:3001/graphql`. Open that
address in a browser to use Apollo Sandbox.

Supported operations:

- `penyewaanList`: returns rental records with their `pelanggan` and `kendaraan`.
- `penyewaanById(id: Int!)`: returns a rental by ID, or `null` if it does not
  exist.
- `createPenyewaan(createPenyewaanInput: CreatePenyewaanInput!)`: creates a
  rental. To follow the assignment example, enter your own last three NIM digits
  in `total_biaya` (for example, `150123` when those digits are `123`).

Example:

```graphql
query GetPenyewaanList {
  penyewaanList {
    id
    tanggal_sewa
    total_biaya
    pelanggan {
      id
      nama
    }
    kendaraan {
      id
      platNomor
      merk
    }
  }
}
```

```graphql
query GetPenyewaanById($id: Int!) {
  penyewaanById(id: $id) {
    id
    tanggal_sewa
    total_biaya
    pelanggan {
      nama
    }
    kendaraan {
      merk
      platNomor
    }
  }
}
```

Set the query variable to, for example, `{ "id": 1 }`.

```graphql
mutation CreatePenyewaan {
  createPenyewaan(
    createPenyewaanInput: {
      tanggal_sewa: "2026-03-30"
      total_biaya: 150123
      pelangganId: 1
      kendaraanId: 1
    }
  ) {
    id
    tanggal_sewa
    total_biaya
    pelanggan {
      nama
    }
    kendaraan {
      platNomor
    }
  }
}
```

Successful vehicle, customer, and rental endpoints return a `message` and the
result in `data`, for example:

```json
{
  "message": "Kendaraan berhasil ditambahkan",
  "data": {
    "id": 1,
    "platNomor": "B 1234 CD",
    "merk": "Toyota"
  }
}
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Observability

In production applications, observability is essential for understanding how your system behaves, detecting issues early, and maintaining reliable performance.

[NestJS Observe](https://observe.nestjs.com) automatically instruments your NestJS application, giving you deep visibility into your system with minimal setup:

- **Distributed tracing:** Follow requests across services and understand how they flow through your system.
- **Waterfall analysis:** Visualize request execution and identify slow operations, bottlenecks, and unexpected delays.
- **Performance analysis:** Analyze application performance in real time and quickly pinpoint areas that need optimization.
- **Metrics:** Track key application and infrastructure metrics to understand system health and performance trends.
- **Logging:** Centralize and correlate logs with traces and other telemetry to make debugging easier.
- **Error tracking:** Detect errors quickly and investigate their root causes with the surrounding context.
- **SLA monitoring:** Track service-level objectives and identify when your application is approaching or exceeding defined thresholds.
- **Alarms and alerts:** Set up alerts for critical errors, performance degradation, SLA violations, and other anomalies so your team can react quickly.

This project is already instrumented. To connect it, run this and approve the code it prints at [observe.nestjs.com/link](https://observe.nestjs.com/link) - signing up for free if you have no account:

```bash
$ npx @nestjs/observe link
```

It writes the app key and secret into `.env` and makes every `nest start` script (`start`, `start:dev`, `start:debug`) load it. In production, set `OBSERVE_APP_KEY` and `OBSERVE_APP_SECRET` in the environment instead.

Or do it by hand: create an application and an API key at [observe.nestjs.com](https://observe.nestjs.com), and set the pair as `OBSERVE_APP_KEY` and `OBSERVE_APP_SECRET` in the environment the app runs in.

The free plan needs no payment details and covers 300,000 events a month. You can also browse the [live demo](https://www.observe-demo.nestjs.com/dashboard) first - the whole dashboard over a busy service's data, with nothing to install.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Auto-instrument your application with [NestJS Observe](https://observe.nestjs.com). Distributed tracing, metrics, and logging made easy. Error tracking and performance monitoring for your NestJS applications.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
