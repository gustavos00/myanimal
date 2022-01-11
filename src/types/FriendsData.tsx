import { UserContextData } from "./UserContextData"

export interface FriendsData {
   idfriends: number,
   status: string,
   fromWho: number,
   toWhom: number,
   user: UserContextData
}
