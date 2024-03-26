import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from 'src/payments/dto/create.payment.dto';

@Injectable()
export class PaymentsService {
  users = [
    {
      email: 'user1@gmail.com',
    },
    {
      email: 'user2@gmail.com',
    },
    {
      email: 'user3@gmail.com',
    },
  ];
  async createPayment(createPayment: CreatePaymentDto) {
    const { email } = createPayment;
    const user = this.users.find((user) => user.email === email);
    if (user) {
      return {
        id: 1,
        status: 'success',
      };
    } else {
      throw new Error('user does not exist');
    }
  }
}
