import { AnimalData } from "./AnimalData";
import { UserAddressData } from "./UserAddressData";

export interface UserContextData {
  familyName: string;
  givenName: string;
  id: number;
  email: string;
  phoneNumber: string;
  token: string;
  photoUrl: string;
  animalData: Array<AnimalData>
  userAddress: UserAddressData;
}

