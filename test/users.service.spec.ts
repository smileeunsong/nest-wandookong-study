import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../src/users/services/users.service';
import { User, UserSchema } from '../src/users/schema/users.schema';
import { UsersRepository } from '../src/users/repository/users.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { forwardRef } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: UsersRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, UsersRepository],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  describe('create', () => {
    it('should create user', async () => {
      // Given

      // When
      const user = usersService.signUp({
        email: 'hello@gmail.com',
        name: 'YOUR_NAME',
        password: 'pass1234',
      });
      // Then
      const expected = new User({
        email: 'hello@gmail.com',
        name: 'YOUR_NAME',
        password: 'pass1234',
      });
      expect(expected).toEqual(user);
    });

    it('should throw error when user already exists', () => {
      // Given
      // When
      // Then
    });
  });
});
