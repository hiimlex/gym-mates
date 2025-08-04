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
  created_at: string;
  updated_at: string;
}

export type IFigure = IItem & {
  file: IFile;
  category: ItemCategory.Figure;
};

export type ITitle = IItem & {
  title: string;
  category: ItemCategory.Title;
};

export type IAchievement = IItem & {
  key: string;
  description: string;
  category: ItemCategory.Achievement;
};
