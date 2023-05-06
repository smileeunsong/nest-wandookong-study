import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersRepository } from '../users.repository';
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

  async update(id: string, body: UpdateUserDto) {
    const { email, name, password } = body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = { email, name, password: hashedPassword };
    return await this.userRepository.updateOne(id, data);
  }

  async delete(id: string) {
    return await this.userRepository.delete(id);
  }
}
