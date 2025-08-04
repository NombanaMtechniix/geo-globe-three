export interface GeoJSONWorldData {
  type: string;
  features: Feature[];
}

export interface Feature {
  type: FeatureType;
  properties: Properties;
  geometry: Geometry;
}

export interface Geometry {
  type: GeometryType;
  coordinates: Array<Array<Array<number[] | number>>>;
}

export enum GeometryType {
  MultiPolygon = "MultiPolygon",
  Polygon = "Polygon",
}

export interface Properties {
  featurecla: FclassISO;
  scalerank: number;
  labelrank: number;
  sovereignt: string;
  sov_a3: string;
  adm0_dif: number;
  level: number;
  type: PropertiesType;
  tlc: null | string;
  admin: string;
  adm0_a3: string;
  geou_dif: number;
  geounit: string;
  gu_a3: string;
  su_dif: number;
  subunit: string;
  su_a3: string;
  brk_diff: number;
  name: string;
  name_long: string;
  brk_a3: string;
  brk_name: string;
  brk_group: null | string;
  abbrev: string;
  postal: string;
  formal_en: null | string;
  formal_fr: null | string;
  name_ciawf: null | string;
  note_adm0: null | string;
  note_brk: null | string;
  name_sort: string;
  name_alt: null | string;
  mapcolor7: number;
  mapcolor8: number;
  mapcolor9: number;
  mapcolor13: number;
  pop_est: number;
  pop_rank: number;
  pop_year: number;
  gdp_md: number;
  gdp_year: number;
  economy: Economy;
  income_grp: IncomeGrp;
  fips_10: string;
  iso_a2: string;
  iso_a2_eh: string;
  iso_a3: string;
  iso_a3_eh: string;
  iso_n3: string;
  iso_n3_eh: string;
  un_a3: string;
  wb_a2: string;
  wb_a3: string;
  woe_id: number;
  woe_id_eh: number;
  woe_note: string;
  adm0_iso: string;
  adm0_diff: null | string;
  adm0_tlc: string;
  adm0_a3_us: string;
  adm0_a3_fr: string;
  adm0_a3_ru: string;
  adm0_a3_es: string;
  adm0_a3_cn: string;
  adm0_a3_tw: string;
  adm0_a3_in: string;
  adm0_a3_np: string;
  adm0_a3_pk: string;
  adm0_a3_de: string;
  adm0_a3_gb: string;
  adm0_a3_br: string;
  adm0_a3_il: string;
  adm0_a3_ps: string;
  adm0_a3_sa: string;
  adm0_a3_eg: string;
  adm0_a3_ma: string;
  adm0_a3_pt: string;
  adm0_a3_ar: string;
  adm0_a3_jp: string;
  adm0_a3_ko: string;
  adm0_a3_vn: string;
  adm0_a3_tr: string;
  adm0_a3_id: string;
  adm0_a3_pl: string;
  adm0_a3_gr: string;
  adm0_a3_it: string;
  adm0_a3_nl: string;
  adm0_a3_se: string;
  adm0_a3_bd: string;
  adm0_a3_ua: string;
  adm0_a3_un: number;
  adm0_a3_wb: number;
  continent: Continent;
  region_un: Continent;
  subregion: string;
  region_wb: RegionWb;
  name_len: number;
  long_len: number;
  abbrev_len: number;
  tiny: number;
  homepart: number;
  min_zoom: number;
  min_label: number;
  max_label: number;
  label_x: number;
  label_y: number;
  ne_id: number;
  wikidataid: string;
  name_ar: string;
  name_bn: string;
  name_de: string;
  name_en: string;
  name_es: string;
  name_fa: string;
  name_fr: string;
  name_el: string;
  name_he: string;
  name_hi: string;
  name_hu: string;
  name_id: string;
  name_it: string;
  name_ja: string;
  name_ko: string;
  name_nl: string;
  name_pl: string;
  name_pt: string;
  name_ru: string;
  name_sv: string;
  name_tr: string;
  name_uk: string;
  name_ur: string;
  name_vi: string;
  name_zh: string;
  name_zht: string;
  fclass_iso: FclassISO;
  tlc_diff: null | string;
  fclass_tlc: FclassISO;
  fclass_us: null | string;
  fclass_fr: FclassISO | null;
  fclass_ru: null | string;
  fclass_es: FclassISO | null;
  fclass_cn: null | string;
  fclass_tw: FclassISO | null;
  fclass_in: null | string;
  fclass_np: FclassISO | null;
  fclass_pk: FclassISO | null;
  fclass_de: FclassISO | null;
  fclass_gb: FclassISO | null;
  fclass_br: FclassISO | null;
  fclass_il: FclassISO | null;
  fclass_ps: FclassISO | null;
  fclass_sa: FclassISO | null;
  fclass_eg: FclassISO | null;
  fclass_ma: FclassISO | null;
  fclass_pt: FclassISO | null;
  fclass_ar: FclassISO | null;
  fclass_jp: FclassISO | null;
  fclass_ko: FclassISO | null;
  fclass_vn: FclassISO | null;
  fclass_tr: FclassISO | null;
  fclass_id: FclassISO | null;
  fclass_pl: FclassISO | null;
  fclass_gr: FclassISO | null;
  fclass_it: FclassISO | null;
  fclass_nl: FclassISO | null;
  fclass_se: FclassISO | null;
  fclass_bd: FclassISO | null;
  fclass_ua: FclassISO | null;
  filename: string;
}

export enum Continent {
  Africa = "Africa",
  Americas = "Americas",
  Antarctica = "Antarctica",
  Asia = "Asia",
  Europe = "Europe",
  NorthAmerica = "North America",
  Oceania = "Oceania",
  SevenSeasOpenOcean = "Seven seas (open ocean)",
  SouthAmerica = "South America",
}

export enum Economy {
  The1DevelopedRegionG7 = "1. Developed region: G7",
  The2DevelopedRegionNonG7 = "2. Developed region: nonG7",
  The3EmergingRegionBRIC = "3. Emerging region: BRIC",
  The4EmergingRegionMIKT = "4. Emerging region: MIKT",
  The5EmergingRegionG20 = "5. Emerging region: G20",
  The6DevelopingRegion = "6. Developing region",
  The7LeastDevelopedRegion = "7. Least developed region",
}

export enum FclassISO {
  Admin0Country = "Admin-0 country",
  Admin0Dependency = "Admin-0 dependency",
  Admin1StatesProvinces = "Admin-1 states provinces",
  Unrecognized = "Unrecognized",
}

export enum IncomeGrp {
  The1HighIncomeOECD = "1. High income: OECD",
  The2HighIncomeNonOECD = "2. High income: nonOECD",
  The3UpperMiddleIncome = "3. Upper middle income",
  The4LowerMiddleIncome = "4. Lower middle income",
  The5LowIncome = "5. Low income",
}

export enum RegionWb {
  Antarctica = "Antarctica",
  EastAsiaPacific = "East Asia & Pacific",
  EuropeCentralAsia = "Europe & Central Asia",
  LatinAmericaCaribbean = "Latin America & Caribbean",
  MiddleEastNorthAfrica = "Middle East & North Africa",
  NorthAmerica = "North America",
  SouthAsia = "South Asia",
  SubSaharanAfrica = "Sub-Saharan Africa",
}

export enum PropertiesType {
  Country = "Country",
  Dependency = "Dependency",
  Disputed = "Disputed",
  Indeterminate = "Indeterminate",
  SovereignCountry = "Sovereign country",
  Sovereignty = "Sovereignty",
}

export enum FeatureType {
  Feature = "Feature",
}
