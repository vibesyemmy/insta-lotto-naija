import * as Parse from 'parse';
import { Md5 } from 'ts-md5/dist/md5';
export const md5 = (contents: string) => Md5.hashStr(contents)

export interface UserData {
  objectId: string;
  username: string;
  email: string;
  avatar?: string;
};

export const initialUser: UserData = {
  objectId: '',
  username: '',
  email: '',
  avatar: ''
};

export function map(arg: Parse.User): UserData {
  if (arg == null || arg === undefined) {
    return null;
  }
  return {
    objectId: arg.id,
    username: arg.getUsername(),
    email: arg.getEmail(),
    avatar: `https://www.gravatar.com/avatar/${md5(arg.getEmail())}?s=52&d=identicon`
  }
}
