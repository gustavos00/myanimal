import { AnimalInfoParams } from '../interfaces/AnimalInfoParams';

export interface UserContextData {
  familyName: string;
  givenName: string;
  email: string;
  imageUrl: string;
  animalData: Array<AnimalInfoParams>;
}