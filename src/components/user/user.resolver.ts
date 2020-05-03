import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import {
  NotFoundException,
  ConflictException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

import { Arg, Int } from 'type-graphql';
import { Request } from 'express';
import slugify from 'slugify';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as gravatar from 'gravatar';
import * as dotenv from 'dotenv';

import { UserService } from './user.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from '../shared/user.decorators';

import { UserType, LogInType } from './dto/create-user.dto';
import {
  UserInput,
  LoginInput,
  UpdateInput,
  QueryValue,
} from './inputs/input-user.input';
import { IDecodedUser } from './interfaces/user.interface';

dotenv.config();
@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Query(() => [UserType])
  async users(@Args('input') { page, limit }: QueryValue): Promise<UserType[]> {
    return this.userService.findAll(page, limit);
  }
  @Query(() => UserType)
  async singleUser(@Args('id') id: string): Promise<UserType> {
    return this.userService.findOne(id);
  }

  @Mutation(() => UserType)
  async createUser(@Args('input') input: UserInput): Promise<UserType> {
    const user = await this.userService.findByEmail(input.email);
    if (user) throw new ConflictException('User already exist');

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(input.password, salt);
    const avatar = gravatar.url(input.email, { s: '200', r: 'pg', d: 'mm' });
    input.password = hash;
    input.imageUrl = avatar;
    input.url = slugify(`${input.firstName} ${input.lastName}`, {
      lower: true,
    });
    const _createdUser = await this.userService.create(input);
    const token = jwt.sign({ _createdUser }, process.env.JWT_SECRET);
    const { _id, email, role, firstName, lastName, password } = _createdUser;
    const createdUser = {
      _id,
      email,
      role,
      token,
      firstName,
      lastName,
      password,
    };
    return createdUser;
  }
  @Mutation(() => LogInType)
  async loginUser(
    @Args('input') { email, password }: LoginInput,
    req: Request,
  ): Promise<LogInType> {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new NotFoundException('User does not exist');
    const isMatch = bcrypt.compareSync(password, user.password);
    if (isMatch) {
      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
      );
      return { isLoggedIn: true, token };
    } else {
      throw new NotFoundException('Invalid password!');
    }
  }

  @Mutation(() => UserType)
  @UseGuards(AuthGuard)
  async updateUser(
    @User() user: IDecodedUser,
    @Args('id') id: string,
    @Args('input') input: UpdateInput,
  ): Promise<UserType> {
    if (user.id === id) {
      return this.userService.update(id, input);
    }
    throw new UnauthorizedException('User not found');
  }

  @Mutation(() => UserType)
  @UseGuards(AuthGuard)
  async deleteUser(
    @User() user: IDecodedUser,
    @Args('id') id: string,
  ): Promise<UserType> {
    console.log(user.id, 'user id');
    return this.userService.delete(id);
  }
}
