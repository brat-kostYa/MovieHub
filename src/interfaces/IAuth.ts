import { User } from "firebase/auth";

export interface IUserProfile {
    firstName: string;
    secondName: string;
    lastName: string;
    gender: string;
    email: string;
    age: number;
    phoneNumber: string;
    country: string;
    password: string;
    favouriteFilm: string,
    userId?: string
}

export interface IProfileResponse {
    firstName: string;
    secondName: string;
    lastName: string;
    gender: string;
    email: string;
    age: number;
    phoneNumber: string;
    country: string;
    password: string;
    favouriteFilm: string,
    profileUrl: string,
    userId?: string,
    docId?: string,
    emailVerified: boolean,
    dateOfBirth: string
}

export interface IDocumentResponse {
    docId: string,
    userId: string
}

export interface IProfileInfo {
    user?: User
}

export interface ILogIn {
    email: string;
    password: string;
}


