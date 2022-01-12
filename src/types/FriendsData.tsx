import { UserData } from "./UserData"

export interface FriendsData {
   idfriends: number,
   status: string,
   userfromWho: number,
   usertoWhom: number,
   fromWhoFk: UserData
}
