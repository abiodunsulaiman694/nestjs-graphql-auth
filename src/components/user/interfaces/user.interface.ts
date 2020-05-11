export interface IUser extends Document {
  readonly _id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly imageUrl?: string;
  readonly password: string;
  readonly token: string;
  readonly url?: string;
  readonly bio?: string;
  readonly role?: string;
}
export interface IDecodedUser {
  readonly id: string;
  readonly email: string;
  readonly role?: string;
  readonly exp: string;
}
