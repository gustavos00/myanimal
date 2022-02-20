import { VeterinarianData } from "./VeterinarianData";

export interface AnimalData {
  age: string;
  birthday: string;
  birthdayMonth: string;
  breed: string;
  idAnimal: number;
  photoName: string;
  photoUrl: string;
  name: string;
  trackNumber: string;
  userIdUser: number;
  userVeterinarian: number
  userVeterinarianFk: VeterinarianData
}

export interface AnimalDataWithArraykey extends AnimalData {
  arrayKey: number
}
