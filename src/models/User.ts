import mongoose, { Document, Model, Schema, Types, InferSchemaType, HydratedDocument } from 'mongoose'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

import config from '../../config'
const { jwt_secret: secret } = config

import generateAccessToken from '../auth/generateAccessToken'

type SchemaInput = InferSchemaType<typeof schema>
type SchemaProps = InferSchemaType<typeof schema> & { id: string, create_date: Date }

type SchemaMethods = {
  validPassword(password: string): boolean;
  setPassword(password: string): void;
  generateJWT(): string,
  toAuthJSON(): { id: string, username: string, token: string }
}
type SchemaStatics = {
  // createProduct(product: SchemaProps): Promise<SchemaDocument<SchemaMethods>>
}

type SchemaDocument<T> = Document<Types.ObjectId, T, SchemaProps>
type SchemaModel = Model<SchemaProps, {}, SchemaMethods> & SchemaStatics

const schema = new Schema({
  username: { // We will set this to a sha256 hash of the product name if the retailer does not provide an ID
    type: String,
    required: true,
    index: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  create_date: {
    type: Date,
    required: false,
    default: Date.now,
  }
})

schema.methods.setPassword = function (password: string): void {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.password = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
}

schema.methods.validPassword = function (password: string): boolean {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.password === hash;
}

schema.methods.generateJWT = function (): string {
  return generateAccessToken(this.id)
}

schema.methods.toAuthJSON = function (): { id: string, username: string, token: string }{
  const { 
    id,
    username,
  } = this.toObject() as SchemaProps;

   const token = this.generateJWT();

  return { id, username, token };
}

const User = mongoose.model<SchemaProps, SchemaModel>('User', schema)

export type UserInput = SchemaInput
export type UserProps = SchemaProps
export type UserMethods = SchemaMethods
export type UserStatics = SchemaStatics
export type UserDocument = HydratedDocument<SchemaProps, SchemaMethods>

export default User;
