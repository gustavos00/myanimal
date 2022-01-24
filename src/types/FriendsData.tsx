import { UserData } from "./UserData"

export interface FriendsData {
   idfriends: number,
   status: string,
   fingerprint: string,
   fromWho: number,
   toWhom: number,
   fromWhoFk: UserData
}

export interface OneFriendDataElementInterface extends FriendsData {
   friendData: UserData
 }