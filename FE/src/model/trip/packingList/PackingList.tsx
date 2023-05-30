export enum IPackingListType {
  DEFAULT = 1,
  WARM = 2,
  COLD = 3,
}

export interface IPackingList {
  basics: IBasics;
  clothes: IClothes;
  hygiene: IHygiene;
  miscellaneous: IMiscellaneous;
}

export interface IBasics {
  travelAids: string[];
  funds: string[];
  travelInfo: string[];
}

export interface IClothes {
  basics: string[];
  dressy: string[];
  outerwear: string[];
  casual: string[];
  footwear: string[];
  accessories: string[];
}

export interface IHygiene {
  hygiene: string[];
}

export interface IMiscellaneous {
  documents: string[];
  bags: string[];
  miscellaneous: string[];
  technology: string[];
  work: string[];
}
