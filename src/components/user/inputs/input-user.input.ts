import { InputType, Field } from 'type-graphql';
import { IsEmail } from 'class-validator';

import { GraphQLUpload, FileUpload } from 'graphql-upload';

@InputType()
export class UserInput {
  @Field({ nullable: false })
  readonly firstName: string;
  @Field({ nullable: false })
  readonly lastName: string;
  @Field({ nullable: true })
  imageUrl?: string;
  @Field({ nullable: false })
  @IsEmail()
  readonly email: string;
  @Field({ nullable: false })
  password: string;
  @Field({ nullable: true })
  url?: string;
  @Field({ nullable: true })
  readonly bio?: string;
  @Field({ nullable: true })
  readonly role?: string = 'Member';
}

@InputType()
export class UpdateInput {
  @Field({ nullable: true })
  readonly firstName?: string;
  @Field({ nullable: true })
  readonly lastName?: string;
  @Field({ nullable: true })
  imageUrl?: string;
  @Field({ nullable: true })
  // @IsEmail()
  readonly email?: string;
  @Field({ nullable: true })
  password?: string;
  @Field({ nullable: true })
  readonly url?: string;
  @Field({ nullable: true })
  readonly bio?: string;
  @Field({ nullable: true })
  readonly role?: string = 'Member';
}

@InputType()
export class QueryValue {
  @Field({ nullable: true })
  readonly page?: number = 0;
  @Field({ nullable: true })
  readonly limit?: number = 5;
}

@InputType()
export class LoginInput {
  @Field({ nullable: false })
  @IsEmail()
  readonly email: string;
  @Field({ nullable: false })
  password: string;
}
