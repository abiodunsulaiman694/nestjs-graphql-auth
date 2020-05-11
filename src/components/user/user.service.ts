import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserType } from './dto/create-user.dto';
import { IUser } from './interfaces/user.interface';
import { UserInput } from './inputs/input-user.input';
@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: any) {}

  async create(createUserDto: UserInput): Promise<UserType> {
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  async findAll(page: number, limit: number): Promise<UserType[]> {
    return await this.userModel
      .find({})
      .skip(page * limit)
      .limit(limit);
  }

  async findOne(id: string): Promise<UserType> {
    return await this.userModel.findOne({ _id: id });
  }
  async findByEmail(email: string): Promise<UserType> {
    return await this.userModel.findOne({ email });
  }

  async delete(id: string): Promise<UserType> {
    return await this.userModel.findByIdAndRemove(id);
  }

  async update(id: string, user: any): Promise<UserType> {
    return await this.userModel.findByIdAndUpdate(id, user, { new: true });
  }
}
