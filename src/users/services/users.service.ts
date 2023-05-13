import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersRepository } from '../repository/users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async signUp(body: CreateUserDto) {
    const { email, name, password } = body;

    const isUserExist = await this.userRepository.existByEmail(email);
    if (isUserExist) {
      throw new UnauthorizedException('user already exists');
    }

    // TODO: 패스워드 규칙 세팅
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return user.readOnlyData;
  }

  async findAll() {
    const allUsers = await this.userRepository.findAll();
    const readOnlyUsers = allUsers.map((user) => user.readOnlyData);
    return readOnlyUsers;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne(id);
    const readOnlyUser = user.readOnlyData;
    return readOnlyUser;
  }

  async update(body: UpdateUserDto) {
    const { id, email, name, password } = body;
    let passwordChangedData;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      passwordChangedData = { email, name, password: hashedPassword };
    }

    return await this.userRepository.updateOne(
      id,
      passwordChangedData ? passwordChangedData : body,
    );
  }

  async delete(id: string) {
    return await this.userRepository.delete(id);
  }
}
