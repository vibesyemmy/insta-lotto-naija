import {Md5} from 'ts-md5/dist/md5';
export const md5 = (contents: string) => Md5.hashStr(contents)
