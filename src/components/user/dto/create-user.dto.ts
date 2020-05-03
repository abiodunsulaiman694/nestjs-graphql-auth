import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class UserType {
  @Field(() => ID)
  readonly _id: string;
  @Field({ nullable: false })
  readonly firstName: string;
  @Field({ nullable: false })
  readonly lastName: string;
  @Field({ nullable: false })
  readonly password: string;
  @Field({ nullable: false })
  readonly email: string;
  @Field({ nullable: true })
  readonly imageUrl?: string;
  @Field({ nullable: true })
  readonly url?: string;
  @Field({ nullable: true })
  readonly bio?: string;
  @Field({ nullable: true })
  readonly role?: string;
  @Field()
  readonly token: string;
}

@ObjectType()
export class LogInType {
  @Field()
  readonly token: string;
  @Field()
  readonly isLoggedIn: boolean;
}
