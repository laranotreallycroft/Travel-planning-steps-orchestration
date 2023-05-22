export enum IReminderType {
  DEFAULT = 1,
  WARM = 2,
  COLD = 3,
}

export interface ITravelAids {
  pleasureReading?: boolean;
  chewingGum?: boolean;
  snacks?: boolean;
  waterBottle?: boolean;
  earplugs?: boolean;
  sleepingMask?: boolean;
  travelPillow?: boolean;
  motionSicknessRemedy?: boolean;
  sleepingPills?: boolean;
  anxietyMedication?: boolean;
}

export interface IFunds {
  wallet?: boolean;
  cash?: boolean;
  creditCards?: boolean;
}

export interface ITravelInfo {
  passport?: boolean;
  visa?: boolean;
  driversLicence?: boolean;
  maps?: boolean;
  travelTickets?: boolean;
  travelGuides?: boolean;
}

export interface IBasics {
  travelAids: ITravelAids;
  funds: IFunds;
  travelInfo: ITravelInfo;
}

export interface IDocuments {
  emergencyContactInfo?: boolean;
  medicalInsuranceCard?: boolean;
  prescriptions?: boolean;
  travelInsurance?: boolean;
  carInsuranceCard?: boolean;
}

export interface IBags {
  backpack?: boolean;
  purse?: boolean;
  tote?: boolean;
  plasticBags?: boolean;
}

export interface IMiscellaneousSubgroup {
  umbrella?: boolean;
  houseKeys?: boolean;
  luggageTags?: boolean;
  hospitalityGifts?: boolean;
  journal?: boolean;
  beachTowel?: boolean;
  beachBall?: boolean;
}

export interface ITechnology {
  cellPhone?: boolean;
  cellPhoneCharger?: boolean;
  laptop?: boolean;
  laptopCharger?: boolean;
  camera?: boolean;
  cameraCharger?: boolean;
  headphones?: boolean;
  batteries?: boolean;
  flashlight?: boolean;
}

export interface IWork {
  workDocuments?: boolean;
  officeSupplies?: boolean;
  notebook?: boolean;
}

export interface IMiscellaneous {
  documents: IDocuments;
  bags: IBags;
  miscellaneous: IMiscellaneousSubgroup;
  technology: ITechnology;
  work: IWork;
}

export interface IBasicClothes {
  underwear?: boolean;
  socks?: boolean;
  undershirts?: boolean;
  bras?: boolean;
  pantyhose?: boolean;
  sleepwear?: boolean;
  robe?: boolean;
}

export interface IDressyClothes {
  dressShirts?: boolean;
  blazers?: boolean;
  slacks?: boolean;
  skirts?: boolean;
  dresses?: boolean;
  suits?: boolean;
  tuxedo?: boolean;
  sweaters?: boolean;
}

export interface IOuterwearClothes {
  jackets?: boolean;
  raincoats?: boolean;
  coats?: boolean;
  skiwear?: boolean;
}

export interface ICasualClothes {
  tShirts?: boolean;
  tankTops?: boolean;
  sweatshirts?: boolean;
  jeans?: boolean;
  exerciseClothing?: boolean;
  shorts?: boolean;
  swimsuits?: boolean;
}

export interface IFootwear {
  athleticShoes?: boolean;
  leisureShoes?: boolean;
  dressShoes?: boolean;
  slippers?: boolean;
  sandals?: boolean;
}

export interface IAccessories {
  belts?: boolean;
  ties?: boolean;
  wristwatches?: boolean;
  jewelry?: boolean;
  sunglasses?: boolean;
  readingGlasses?: boolean;
  glassesCases?: boolean;
  hats?: boolean;
  gloves?: boolean;
  scarves?: boolean;
}

export interface IClothes {
  basics: IBasicClothes;
  dressy: IDressyClothes;
  outerwear: IOuterwearClothes;
  casual: ICasualClothes;
  footwear: IFootwear;
  accessories: IAccessories;
}

export interface IHygieneSubgroup {
  toothbrush?: boolean;
  toothpaste?: boolean;
  dentalFloss?: boolean;
  mouthwash?: boolean;
  soap?: boolean;
  washcloth?: boolean;
  deodorant?: boolean;
  shampoo?: boolean;
  conditioner?: boolean;
  brush?: boolean;
  comb?: boolean;
  curlingIron?: boolean;
  flatIron?: boolean;
  stylingProducts?: boolean;
  hairAccessories?: boolean;
  mirror?: boolean;
  cleanser?: boolean;
  sunscreen?: boolean;
  moisturizer?: boolean;
  lipBalm?: boolean;
  contactLenses?: boolean;
  salineSolution?: boolean;
  shavingCream?: boolean;
  razor?: boolean;
  perfume?: boolean;
  makeup?: boolean;
  makeupRemover?: boolean;
  birthControl?: boolean;
  feminineHygiene?: boolean;
  nailClippers?: boolean;
  nailFile?: boolean;
  handWipes?: boolean;
  tissues?: boolean;
  cottonSwabs?: boolean;
  tweezers?: boolean;
  insectRepellent?: boolean;
  medications?: boolean;
  painReliever?: boolean;
  vitamins?: boolean;
  firstAid?: boolean;
  bandAids?: boolean;
  towels?: boolean;
}

export interface IHygiene {
  hygiene: IHygieneSubgroup;
}

export interface IReminder {
  basics: IBasics;
  miscellaneous: IMiscellaneous;
  clothes: IClothes;
  hygiene: IHygiene;
}

export const travelRemindersDefaultValues: IReminder = {
  basics: {
    travelAids: {
      pleasureReading: true,
      chewingGum: true,
      snacks: true,
      waterBottle: true,
      earplugs: true,
      sleepingMask: true,
      travelPillow: true,
      motionSicknessRemedy: true,
      sleepingPills: true,
      anxietyMedication: true,
    },
    funds: { wallet: true, cash: true, creditCards: true },
    travelInfo: {
      passport: true,
      visa: true,
      driversLicence: true,
      maps: true,
      travelTickets: true,
      travelGuides: true,
    },
  },
  miscellaneous: {
    documents: {
      emergencyContactInfo: true,
      medicalInsuranceCard: true,
      prescriptions: true,
      travelInsurance: true,
      carInsuranceCard: true,
    },
    bags: { backpack: true, purse: true, tote: true, plasticBags: true },
    miscellaneous: {
      umbrella: true,
      houseKeys: true,
      luggageTags: true,
      hospitalityGifts: true,
      journal: true,
      beachTowel: false,
      beachBall: false,
    },
    technology: {
      cellPhone: true,
      cellPhoneCharger: true,
      laptop: true,
      laptopCharger: true,
      camera: true,
      cameraCharger: true,
      headphones: true,
      batteries: true,
      flashlight: true,
    },
    work: { workDocuments: true, officeSupplies: true, notebook: true },
  },
  clothes: {
    basics: {
      underwear: true,
      socks: true,
      undershirts: true,
      bras: true,
      pantyhose: true,
      sleepwear: true,
      robe: true,
    },
    dressy: {
      dressShirts: true,
      blazers: true,
      slacks: true,
      skirts: true,
      dresses: true,
      suits: true,
      tuxedo: true,
      sweaters: false,
    },
    outerwear: { jackets: true, raincoats: true, coats: false, skiwear: false },
    casual: {
      tShirts: true,
      tankTops: true,
      sweatshirts: true,
      jeans: true,
      exerciseClothing: true,
      shorts: false,
      swimsuits: false,
    },
    footwear: {
      athleticShoes: true,
      leisureShoes: true,
      dressShoes: true,
      slippers: true,
      sandals: false,
    },
    accessories: {
      belts: true,
      ties: true,
      wristwatches: true,
      jewelry: true,
      sunglasses: true,
      readingGlasses: true,
      glassesCases: true,
      hats: false,
      gloves: false,
      scarves: false,
    },
  },
  hygiene: {
    hygiene: {
      toothbrush: true,
      toothpaste: true,
      dentalFloss: true,
      mouthwash: true,
      soap: true,
      washcloth: true,
      deodorant: true,
      shampoo: true,
      conditioner: true,
      brush: true,
      comb: true,
      curlingIron: true,
      flatIron: true,
      stylingProducts: true,
      hairAccessories: true,
      mirror: true,
      cleanser: true,
      sunscreen: true,
      moisturizer: true,
      lipBalm: true,
      contactLenses: true,
      salineSolution: true,
      shavingCream: true,
      razor: true,
      perfume: true,
      makeup: true,
      makeupRemover: true,
      birthControl: true,
      feminineHygiene: true,
      nailClippers: true,
      nailFile: true,
      handWipes: true,
      tissues: true,
      cottonSwabs: true,
      tweezers: true,
      insectRepellent: true,
      medications: true,
      painReliever: true,
      vitamins: true,
      firstAid: true,
      bandAids: true,
      towels: true,
    },
  },
};

export const travelRemindersDefaultValuesStringArray = [
  // Basics - Travel Aids
  "pleasureReading",
  "chewingGum",
  "snacks",
  "waterBottle",
  "earplugs",
  "sleepingMask",
  "travelPillow",
  "motionSicknessRemedy",
  "sleepingPills",
  "anxietyMedication",
  // Basics - Funds
  "wallet",
  "cash",
  "creditCards",
  // Basics - Travel Info
  "passport",
  "visa",
  "driversLicence",
  "maps",
  "travelTickets",
  "travelGuides",
  // Miscellaneous - Documents
  "emergencyContactInfo",
  "medicalInsuranceCard",
  "prescriptions",
  "travelInsurance",
  "carInsuranceCard",
  // Miscellaneous - Bags
  "backpack",
  "purse",
  "tote",
  "plasticBags",
  // Miscellaneous - Miscellaneous
  "umbrella",
  "houseKeys",
  "luggageTags",
  "hospitalityGifts",
  "journal",
  // Miscellaneous - Technology
  "cellPhone",
  "cellPhoneCharger",
  "laptop",
  "laptopCharger",
  "camera",
  "cameraCharger",
  "headphones",
  "batteries",
  "flashlight",
  // Miscellaneous - Work
  "workDocuments",
  "officeSupplies",
  "notebook",
  // Clothes - Basics
  "underwear",
  "socks",
  "undershirts",
  "bras",
  "pantyhose",
  "sleepwear",
  "robe",
  // Clothes - Dressy
  "dressShirts",
  "blazers",
  "slacks",
  "skirts",
  "dresses",
  "suits",
  "tuxedo",
  // Clothes - Outerwear
  "jackets",
  "raincoats",
  // Clothes - Casual
  "tShirts",
  "tankTops",
  "sweatshirts",
  "jeans",
  "exerciseClothing",
  // Clothes - Footwear
  "athleticShoes",
  "leisureShoes",
  "dressShoes",
  "slippers",
  // Clothes - Accessories
  "belts",
  "ties",
  "wristwatches",
  "jewelry",
  "sunglasses",
  "readingGlasses",
  "glassesCases",
  // Hygiene
  "toothbrush",
  "toothpaste",
  "dentalFloss",
  "mouthwash",
  "soap",
  "washcloth",
  "deodorant",
  "shampoo",
  "conditioner",
  "brush",
  "comb",
  "curlingIron",
  "flatIron",
  "stylingProducts",
  "hairAccessories",
  "mirror",
  "cleanser",
  "sunscreen",
  "moisturizer",
  "lipBalm",
  "contactLenses",
  "salineSolution",
  "shavingCream",
  "razor",
  "perfume",
  "makeup",
  "makeupRemover",
  "birthControl",
  "feminineHygiene",
  "nailClippers",
  "nailFile",
  "handWipes",
  "tissues",
  "cottonSwabs",
  "tweezers",
  "insectRepellent",
  "medications",
  "painReliever",
  "vitamins",
  "firstAid",
  "bandAids",
  "towels",
];

export const travelRemindersWarmValues: IReminder = {
  ...travelRemindersDefaultValues,
  clothes: {
    ...travelRemindersDefaultValues.clothes,
    casual: {
      ...travelRemindersDefaultValues.clothes.casual,
      shorts: true,
      swimsuits: true,
    },
    footwear: {
      ...travelRemindersDefaultValues.clothes.footwear,
      sandals: true,
    },
  },
  miscellaneous: {
    ...travelRemindersDefaultValues.miscellaneous,
    miscellaneous: {
      ...travelRemindersDefaultValues.miscellaneous.miscellaneous,
      beachTowel: true,
      beachBall: true,
    },
  },
};

export const travelRemindersWarmValuesStringArray = [
  // Clothes - Casual
  "shorts",
  "swimsuits",
  // Clothes - Footwear
  "sandals",
  // Miscellaneous - Miscellaneous
  "beachTowel",
  "beachBall",
];

export const travelRemindersColdValues: IReminder = {
  ...travelRemindersDefaultValues,
  clothes: {
    ...travelRemindersDefaultValues.clothes,
    dressy: { ...travelRemindersDefaultValues.clothes.dressy, sweaters: true },
    outerwear: {
      ...travelRemindersDefaultValues.clothes.outerwear,
      coats: true,
      skiwear: true,
    },
    accessories: {
      ...travelRemindersDefaultValues.clothes.accessories,
      hats: true,
      gloves: true,
      scarves: true,
    },
  },
};
export const travelRemindersColdValuesStringArray = [
  // Clothes - Dressy
  "sweaters",
  // Clothes - Outerwear
  "coats",
  "skiwear",
  // Clothes - Accessories
  "hats",
  "gloves",
  "scarves",
];
