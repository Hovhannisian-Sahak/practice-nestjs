import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import { Request, Response } from 'express';
import { PaymentsService } from 'src/payments/services/payments/payments.service';
describe('PaymentsController', () => {
  let controller: PaymentsController;
  let paymentService: PaymentsService;
  const requestMock = {
    query: {},
  } as unknown as Request;
  const statusResponseMock = {
    send: jest.fn((y) => y),
  };
  const responseMock = {
    status: jest.fn((x) => statusResponseMock),
    send: jest.fn((y) => y),
  } as unknown as Response;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [
        {
          provide: 'PAYMENTS_SERVICE',
          useValue: {
            createPayment: jest.fn((x) => x),
          },
        },
      ],
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
    paymentService = module.get<PaymentsService>('PAYMENTS_SERVICE');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('paymentService should be defined', () => {
    expect(paymentService).toBeDefined();
  });
  describe('getPayments', () => {
    it('should return a status of 400', async () => {
      await controller.getPayments(requestMock, responseMock);
      expect(responseMock.status).toHaveBeenCalledWith(400);
      expect(statusResponseMock.send).toHaveBeenCalledWith({
        error: 'Missing count or page query parameters',
      });
    });
    it('should return a status code of 200 when query params are present', async () => {
      requestMock.query = {
        count: '10',
        page: '1',
      };
      await controller.getPayments(requestMock, responseMock);
      expect(responseMock.send).toHaveBeenCalledWith(200);
    });
  });
  describe('createPayment', async () => {
    it('should throw an error', async () => {
      jest.spyOn(paymentService, 'createPayment').mockImplementationOnce(() => {
        throw new Error('user does not exist');
      });
      try {
        await controller.createPayment({
          email: 'user1@gmail.com',
          amount: 100,
        });
      } catch (error) {
        console.log(error);
      }
    });
  });
});
