import { IFile } from "./FileModel";

export interface IUserRef {
  _id: string;
  name: string;
  email?: string;
  avatar?: IFile;
}
