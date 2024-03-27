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
  describe('Authentication (e2e)', () => {
    let cookie = '';
    it('should login', (done) => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          username: 'userUser',
          password: '12345678',
        })
        .expect(201);
      // for session authentication add this
      // .end((err, res) => {
      //   cookie = res.headers['set-cookie'];
      //   done();
      // });
    });
    it('should visit /users and return 200', () => {
      //for session authentication add [.set('Cookie',cookie)] after get method
      return request(app.getHttpServer()).get('/users').expect(200);
    });
  });
});
