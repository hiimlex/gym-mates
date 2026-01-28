import { IFile, IItem, SkinSex } from "@models/collections";

export interface IWearingSchema<ItemType = IItem> {
  item: ItemType;
  colorName: string;
}

export interface IUserCharacter {
  hair?: IWearingSchema;
  top?: IWearingSchema;
  bottom?: IWearingSchema;
  skin_color: string;
  eye_color: string;
  id: string;
  user: string;
  sex: SkinSex;
  preview?: IFile;
}

export interface ICreateCharacterPayload {
  sex: SkinSex;
  hair?: IWearingSchema<string>;
  top?: IWearingSchema<string>;
  bottom?: IWearingSchema<string>;
  skin_color: string;
  eye_color: string;
}
