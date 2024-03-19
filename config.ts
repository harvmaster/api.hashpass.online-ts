interface Config {
  mongo: string,
  jwt_secret: string,
  port: number,
  minio: {
    endpoint: string,
    accessKey: string,
    secretKey: string
  }
}

// Example of a config file
/*
  const config = {
    mongo: 'mongodb://User:Password@localhost:27017',
    jwt_secret: 'secret',
    port: 3000,
    minio: {
      endpoint: 'minio.domain.com',
      accessKey: 'minioAccessKey',
      secretKey: 'minioSecretKey'
    }
  }
*/


export default config