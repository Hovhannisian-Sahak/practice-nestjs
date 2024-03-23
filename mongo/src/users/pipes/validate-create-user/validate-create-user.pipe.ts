import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';

@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {
  transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    // const parseToInt = parseInt(value.age.toString());
    // if (isNaN(parseToInt)) {
    //   throw new HttpException('expected number', HttpStatus.BAD_REQUEST);
    // }

    return { ...value };
  }
}
