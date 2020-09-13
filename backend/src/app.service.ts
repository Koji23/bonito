import { Injectable } from '@nestjs/common';
const redis = require("redis");

const client = redis.createClient({
  host: "redis-server", // perhaps change this to an environment variable
  port: 6379
});
client.set("visits", 0);


@Injectable()
export class AppService {
  getHello(): string {

    client.get("visits", (err, visits) => {
      console.log(".......................visits", visits);
      client.set("visits", parseInt(visits) + 1);
    });
    return 'Hello World!!!';
  }
}
