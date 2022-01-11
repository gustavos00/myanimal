import { UserData } from "./UserData"

export interface FriendsData {
   idfriends: number,
   status: string,
   fromWho: number,
   toWhom: number,
   user: UserData
}
