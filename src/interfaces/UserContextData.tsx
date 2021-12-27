import { AnimalInfoParams } from '../interfaces/AnimalInfoParams';

export interface UserContextData {
  familyName: string;
  givenName: string;
  id: number;
  email: string;
  imageUrl: string;
  animalData: Array<AnimalInfoParams>;
  userAddress: UserAddressData;
}

interface UserAddressData {
  doorNumber: string;
  postalCode: string;
  streetName: string;
  parishName: string;
  locationName: string;
}
