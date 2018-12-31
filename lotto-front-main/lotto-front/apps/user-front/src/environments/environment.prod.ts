import { ParseParams } from "@lotto-front/model";

export const environment = {
  production: true,
  parseParams: <ParseParams> {
    appId: "abcd",
    serverUrl: "http://lotto-api:3000/api"
  }
};
