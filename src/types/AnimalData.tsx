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
}

export interface AnimalDataWithArraykey extends AnimalData {
  arrayKey: number
}
