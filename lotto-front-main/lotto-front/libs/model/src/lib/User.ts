import * as Parse from 'parse';

export interface UserData {
    objectId: string;
    username: string;
    email: string;
}

export function map<UserData>(arg: Parse.User): UserData {
    return {
        objectId: arg.id,
        username: arg.getUsername(),
        email: arg.getEmail()
    }
}