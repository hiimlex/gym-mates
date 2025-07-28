import { IFile } from "./file.model";

export interface ITitle {
  _id: string;
  title: string;
  name: string;
  image: IFile;
  created_at: string;
  updated_at: string;
}
