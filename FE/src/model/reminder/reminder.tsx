export enum IReminderType {
  DEFAULT = 1,
  WARM = 2,
  COLD = 3,
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
export interface ICustom {
  custom: string[];
}
export interface IReminder {
  basics: IBasics;
  clothes: IClothes;
  hygiene: IHygiene;
  miscellaneous: IMiscellaneous;
  custom?: ICustom;
}
export const travelRemindersDefaultValues: IReminder = {
  basics: {
    travelAids: [
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
    ],
    funds: ["wallet", "cash", "creditCards"],
    travelInfo: [
      "passport",
      "visa",
      "driversLicence",
      "maps",
      "travelTickets",
      "travelGuides",
    ],
  },
  clothes: {
    basics: [
      "underwear",
      "socks",
      "undershirts",
      "bras",
      "pantyhose",
      "sleepwear",
      "robe",
    ],
    dressy: [
      "dressShirts",
      "blazers",
      "slacks",
      "skirts",
      "dresses",
      "suits",
      "tuxedo",
    ],
    outerwear: ["jackets", "raincoats"],
    casual: ["tShirts", "tankTops", "sweatshirts", "jeans", "exerciseClothing"],
    footwear: ["athleticShoes", "leisureShoes", "dressShoes", "slippers"],
    accessories: [
      "belts",
      "ties",
      "wristwatches",
      "jewelry",
      "sunglasses",
      "readingGlasses",
      "glassesCases",
    ],
  },
  hygiene: {
    hygiene: [
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
    ],
  },
  miscellaneous: {
    documents: [
      "emergencyContactInfo",
      "medicalInsuranceCard",
      "prescriptions",
      "travelInsurance",
      "carInsuranceCard",
    ],
    bags: ["backpack", "purse", "tote", "plasticBags"],
    miscellaneous: [
      "umbrella",
      "houseKeys",
      "luggageTags",
      "hospitalityGifts",
      "journal",
    ],
    technology: [
      "cellPhone",
      "cellPhoneCharger",
      "laptop",
      "laptopCharger",
      "camera",
      "cameraCharger",
      "headphones",
      "batteries",
      "flashlight",
    ],
    work: ["workDocuments", "officeSupplies", "notebook"],
  },
};

export const travelRemindersWarmValues: IReminder = {
  basics: {
    travelAids: [],
    funds: [],
    travelInfo: [],
  },
  clothes: {
    basics: [],
    dressy: [],
    outerwear: [],
    casual: ["shorts", "swimsuits"],
    footwear: ["sandals"],
    accessories: [],
  },
  hygiene: {
    hygiene: [],
  },
  miscellaneous: {
    documents: [],
    bags: [],
    miscellaneous: ["beachTowel", "beachBall"],
    technology: [],
    work: [],
  },
};

export const travelRemindersColdValues: IReminder = {
  basics: {
    travelAids: [],
    funds: [],
    travelInfo: [],
  },
  clothes: {
    basics: [],
    dressy: ["sweaters"],
    outerwear: ["coats", "skiwear"],
    casual: [],
    footwear: [],
    accessories: ["hats", "gloves", "scarves"],
  },
  hygiene: {
    hygiene: [],
  },
  miscellaneous: {
    documents: [],
    bags: [],
    miscellaneous: [],
    technology: [],
    work: [],
  },
};
