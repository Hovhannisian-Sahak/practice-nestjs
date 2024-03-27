import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
export class CreateUserSettingsDto {
  @IsOptional()
  @IsBoolean()
  receiveNotifications?: boolean;
  @IsOptional()
  @IsBoolean()
  receiveEmails?: boolean;
  @IsOptional()
  @IsBoolean()
  receiveSMS?: boolean;
}
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  username: string;
  @IsString()
  @IsOptional()
  displayName?: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  password: string;
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateUserSettingsDto)
  settings?: CreateUserSettingsDto;
}
