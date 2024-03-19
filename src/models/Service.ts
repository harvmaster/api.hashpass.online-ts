import mongoose, { Document, Model, Schema, Types, InferSchemaType, HydratedDocument } from 'mongoose'
import minio from 'minio'
// import config from '../../config'
// const { endpoint, accessKey, secretKey } = config.minio

type SchemaInput = InferSchemaType<typeof schema>
type SchemaProps = InferSchemaType<typeof schema> & { id: string, create_date: Date }

type SchemaMethods = {
  toJSONData(): Promise<ServiceProps>
  refreshLogo(): Promise<string>
}
type SchemaStatics = {
  // createService(Service: SchemaProps): Promise<SchemaDocument<SchemaMethods>>
}

type SchemaDocument<T> = Document<Types.ObjectId, T, SchemaProps>
type SchemaModel = Model<SchemaProps, {}, SchemaMethods> & SchemaStatics

// const s3 = new minio.Client({
//   endPoint: endpoint,
//   port: 9000,
//   useSSL: false,
//   accessKey: accessKey,
//   secretKey: secretKey
// });

const schema = new Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  logo: {
    type: String,
    required: false,
  },
  note: {
    type: String,
    required: false,
  },
  legacy: {
    type: Boolean,
    default: false
  },
  create_date: {
    type: Date,
    required: false,
    default: Date.now,
  }
})

schema.methods.toJSONData = async function (): Promise<ServiceProps> {
  const { 
    id,
    name,
    user,
    note,
    legacy,
    create_date, 
  } = this.toObject() as SchemaProps;

  const logo = this.logo

  return { id, name, user, logo, note, legacy, create_date };
}

schema.methods.refreshLogo = function (): Promise<string> {
  return new Promise ((resolve, reject) => {
      if (this.logo.split('/').length > 2) return resolve(this.logo)
      
      resolve('')
      // s3.presignedGetObject('icons', this.logo, 24*60*60*7, (err, presignedUrl) => {
      //     if (err) reject(err)
      //     resolve(presignedUrl)
      // })
  })
}

const Service = mongoose.model<SchemaProps, SchemaModel>('Service', schema)

export type ServiceInput = SchemaInput
export type ServiceProps = SchemaProps
export type ServiceMethods = SchemaMethods
export type ServiceStatics = SchemaStatics
export type ServiceDocument = HydratedDocument<SchemaProps, SchemaMethods>

export default Service;
