import { UsersController } from '../src/users/controllers/users.controller';
import { UsersService } from '../src/users/services/users.service';
import { UsersRepository } from '../src/users/repository/users.repository';
import { AuthService } from 'src/auth/services/auth.service';
import { Test } from '@nestjs/testing';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  let usersRepository: UsersRepository;
  let authService: AuthService;

  const mockUsersService = {};

  beforeEach(async () => {
    // usersService = new UsersService(usersRepository);
    // usersController = new UsersController(usersService, authService);

    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    // usersRepository = moduleRef.get<UsersRepository>(UsersRepository);
    usersService = moduleRef.get<UsersService>(UsersService);
    usersController = moduleRef.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });
  // describe('findAll', () => {
  //   it('should return an array of users', async () => {
  //     jest.spyOn(usersService, 'findAll').mockReturnValue('');
  //     expect(usersController.findAll()).toEqual({ message: 'Hey~' });
  //     expect(usersService.findAll).toBeCalledTimes(1);
  //     expect(usersService.findAll).toBeCalledWith();
  //   });
  // });
});
