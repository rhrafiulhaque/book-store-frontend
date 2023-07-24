export interface IBooks {
  _id: any | null | undefined;
  year: number;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  reviews: string;
}

export interface IUser {
  email: string;
  name: string;
}

export interface IResponse {
  data?: {
    success: boolean;
    message: string;
  };
}
