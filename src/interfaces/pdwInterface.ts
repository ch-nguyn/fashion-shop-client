export interface IWard {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  district_code: number;
}

export interface IDistrict {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  rovince_code: number;
  wards: IWard[];
}

export interface IProvince {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  phone_code: string;
  districts: IDistrict[];
}
