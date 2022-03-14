import { AnimalData } from "./AnimalData";
import { UserAddressData } from "./UserAddressData";

export interface UserData {
  familyName: string;
  givenName: string;
  id?: number;
  idUser: number;
  email: string;
  phoneNumber: string;
  token: string;
  photoUrl: string;
  isVeterinarian: boolean;
  animalData: Array<AnimalData>
  userAddress: UserAddressData;
}

