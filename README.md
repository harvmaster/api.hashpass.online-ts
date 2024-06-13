# API.Hashpass (ts)
An ExpressJS REST API built to be interacted with from [www.hashpass](https://github.com/harvmaster/www.hashpass.online) ([DEMO](https://sdb.hzuccon.com/#/)).
It handles the storage of user data, such as what services they use the password generator for. It stictly does not store passwords that are generated for each services as this is handled completely on the client side.

# Config
```ts
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
```

# Features
- Storing users and services 
- BYO Icons for services
- Choice of algorithm to use to generate passwords
