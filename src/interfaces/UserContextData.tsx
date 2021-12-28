import { AnimalInfoParams } from "./AnimalInfoParams";
import { UserAddressData } from "./UserAddressData";

export interface UserContextData {
  familyName: string;
  givenName: string;
  id: number;
  email: string;
  imageUrl: string;
  animalData: Array<AnimalInfoParams>
  userAddress: UserAddressData;
}

