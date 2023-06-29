export interface ICar {
  availability: boolean;
  car: string;
  car_color: string;
  car_model: string;
  car_model_year: number;
  car_vin: string;
  id: number;
  price: string;
}

export interface ICarTableData {
  id: number;
  Company: string;
  Model: string;
  VIN: string;
  Color: string;
  Year: number;
  Price: string;
  Availability: string;
  Actions?: JSX.Element[];
}
