import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create a new user', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        username: 'likuyjtghjhdg',
        password: 'User123456789',
      })
      .expect(201);
  });
  it('should return 400 when invalid username provided', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        username: 'a',
        password: 'User123456789',
      })
      .expect(400);
  });
  it('should return 400 when invalid password provided', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        username: 'user11user11',
        password: 'p',
      })
      .expect(400);
  });
});
