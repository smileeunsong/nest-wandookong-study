import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from '../schema/users.schema';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async existByEmail(email: string) {
    return await this.userModel.exists({ email });
  }

  async create(user: CreateUserDto): Promise<User> {
    return await this.userModel.create(user);
  }

  async findAll(): Promise<User[] | null> {
    return await this.userModel.find();
  }

  async findOne(id: string | Types.ObjectId): Promise<User | null> {
    return await this.userModel.findOne({ _id: id });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email });
  }

  async findUserByIdWithoutPassword(userId: string): Promise<User | null> {
    return await this.userModel.findById(userId).select('-password');
  }

  async updateOne(id: string, body: UpdateUserDto): Promise<User> {
    await this.userModel.updateOne({ _id: id }, { ...body });
    const updatedUser = await this.userModel.findOne({ _id: id });
    return updatedUser;
  }

  async delete(id: string) {
    return await this.userModel.deleteOne({ _id: id });
  }
}
