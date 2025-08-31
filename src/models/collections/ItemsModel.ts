import { IFile } from "./FileModel";

export enum ItemCategory {
  Title = "title",
  Achievement = "achievement",
  Figure = "figure",
  Badge = "badge",
  Skin = "skin",
  Avatar = "avatar",
}

export enum SkinPiece {
  top = "top",
  bottom = "bottom",
  full = "full",
  boots = "boots",
  hair = "hair",
}

export enum SkinSex {
  male = "male",
  female = "female",
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
  //
  sex?: SkinSex;
  piece?: SkinPiece;
  //
  locked?: boolean;
}
