import { AnimalInfoParams } from "../interfaces/AnimalInfoParams";

export interface UserContextData {
  familyname: string;
  givenname: string;
  email: string;
  photourl: string;
  animalData: Array<AnimalInfoParams>;
}
