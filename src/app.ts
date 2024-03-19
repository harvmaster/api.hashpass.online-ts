import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { AddressInfo } from 'net'

import routes from './routes';

import mongoose from './services/mongoose'

import config from '../config'

export const startServer = async () => {
  
  // Connect to mongoDB
  try {
    console.log('Connecting to MongoDB')
    await mongoose.connect(config.mongo)
    console.log('Connected to MongoDB')
  } catch (err) {
    console.error(err.message)
  }

  //
  // Setup ExpressJS middleware, routes, etc
  //
  const app = express()
  app.use(cors())
  app.use(bodyParser.json())
  app.use(bodyParser.raw({ type: '*/*' }))
  app.use(function (err, req, res, next) {
    console.log('requested')
    next()
  })
  app.use('/api', routes)

  //
  // Set port and start ExpressJS Server
  //
  const server = app.listen(config.port)
  const address = server.address() as AddressInfo
  console.log('Starting ExpressJS server')
  console.log(`ExpressJS listening at http://${address.address}:${address.port}`)
}

startServer()