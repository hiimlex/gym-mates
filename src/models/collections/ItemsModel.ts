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

export type AchievementRarity = "common" | "rare" | "epic" | "legendary";

export const AchievementRarityColors: Record<AchievementRarity, string> = {
  // white pastel color
  common: "#daf2f6cc",
  // green
  rare: "#44863bcc",
  // red
  epic: "#de2f1fcc",
  // purple
  legendary: "#8b23d1cc",
}

export interface IItem {
  _id: string;
  name?: string;
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
  // Skins
  sex?: SkinSex;
  piece?: SkinPiece;
  // Achievements
  rarity?: AchievementRarity;
  // General
  locked?: boolean;
}
