import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersRepository } from 'src/users/repository/users.repository';
import { UsersService } from 'src/users/services/users.service';

describe('UsersService (Unit)', () => {
  let usersService: UsersService;
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, UsersRepository],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  describe('create', () => {
    it('유저를 생성하고, 생성한 유저를 반환한다', async () => {
      const email = 'hello@gmail.com';
      const name = 'eunsong';
      const password = '123pass123';
      const body = {
        email,
        name,
        password,
      };
      const createUserDto = CreateUserDto.of(body);
      const savedUser = User.of(email, name, password, true);
      jest.spyOn(usersRepository, 'create').mockResolvedValue(savedUser);

      const result = await usersService.signUp(createUserDto);

      expect(result).toBe(savedUser);
    });
  });
});
