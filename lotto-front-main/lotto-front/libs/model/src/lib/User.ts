import * as Parse from 'parse';

export interface UserData {
    objectId: string;
    username: string;
    email: string;
};

export function map(arg: Parse.User): UserData {
  if (arg == null || arg === undefined) {
    return null;
  }
  return {
    objectId: arg.id,
    username: arg.getUsername(),
    email: arg.getEmail()
  }
}
