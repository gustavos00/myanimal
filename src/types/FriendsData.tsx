import { UserData } from "./UserData"

export interface FriendsData {
   idfriends: number,
   status: string,
   fingerprint: string,
   userFriendsIdFromWho: number,
   userFriendsIdToWho: number,
   userFriendsIdFromWhoFk: UserData
   friendData: UserData
}