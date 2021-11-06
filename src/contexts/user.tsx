import React, { createContext, useEffect, useState } from "react";
import * as auth from '../services/auth'

interface AnimalData {
  age: string,
  chipnumber: string,
  name: string,
  photo: string,
  race: string,
  userid: string,
}

interface UserContextData {
  familyname: string,
  givenname: string,
  email: string,
  photourl: string,
  animalData: Array<AnimalData>,
}

interface AuthContextData {
  signed: boolean,
  token: string | void,
  user: UserContextData | void,

  googleSignIn: () => Promise<boolean>,
  pushAnimalData: (data : AnimalData) => void,
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({children} : any) {
  const [user, setUser] = useState<UserContextData | void>()
  const [token, setToken] = useState<string | void>()

  const googleSignIn = async() => {
    const response = await auth.GoogleSignIn()
    if(!response) return false;

    setToken(response.token)
    setUser(response)

    return true;
  }

  const pushAnimalData = (data : AnimalData) => {
    user?.animalData.push(data)
  }

  return (
    <AuthContext.Provider value={{
      signed: !!user,
      token,
      user,

      googleSignIn,
      pushAnimalData,
    }}>
      {children}
    </AuthContext.Provider>
  )
};

export default AuthContext;