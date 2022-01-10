import { AnimalInfoParams } from "./AnimalInfoParams";
import { UserAddressData } from "./UserAddressData";

export interface UserContextProps {
  familyName: string;
  givenName: string;
  id: number;
  email: string;
  phoneNumber: string;
  token: string;
  photoUrl: string;
  animalData: Array<AnimalInfoParams>
  userAddress: UserAddressData;
}

