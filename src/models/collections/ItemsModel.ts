import { IFile } from "./FileModel";

export enum ItemCategory {
  Title = "title",
  Achievement = "achievement",
  Figure = "figure",
  Badge = "badge",
  Skin = "skin",
  Avatar = "avatar",
}

export interface IItem {
  _id: string;
  name: string;
  category: ItemCategory;
  price: number;
  requirements: string[];
    key?: string;
  description?: string;
  file?: IFile;
  preview?: IFile;
  title?: string;
  created_at: string;
  updated_at: string;
  locked?: boolean;
}

