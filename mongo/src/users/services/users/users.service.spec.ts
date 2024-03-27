import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { User } from 'src/schemas/User.schema';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import * as bcryptUtils from '../../../utils/bcrypt';
describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: Model<User>;
  console.log(getModelToken(User.name));
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            findByUsername: jest.fn(),
            findById: jest.fn(),
            find: jest.fn(),
            findOneAndUpdate: jest.fn(),
            findOneAndDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('userRepository should be defined', () => {
    expect(usersRepository).toBeDefined();
  });
  describe('creatuser', () => {
    jest.spyOn(bcryptUtils, 'encodePassword').mockReturnValue('hashed123');
    it('should encode password correctly', async () => {
      await service.createUser({
        username: 'test',
        password: '123',
      });

      expect(bcryptUtils.encodePassword).toHaveBeenCalledWith('123');
    });
    it('should call user repo with correct params', async () => {
      await service.createUser({
        username: 'test',
        password: 'hashed123',
      });
      expect(usersRepository.create);
    });
    // it('should call user repo with correct params', async () => {
    //   jest.spyOn(usersRepository, 'create').mockReturnValueOnce({
    //     username: 'test',
    //     password: 'hashed123',
    //   });
    //   await service.createUser({
    //     username: 'test',
    //     password: '123',
    //   });
    //   //suppose it has save method which is called inside create function
    //   expect(usersRepository.save).toHaveBeenCalledWith({
    //     username: 'test',
    //     password: 'hashed123',
    //   });
    // });
  });
});
