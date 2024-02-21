export async function getProfileData(fid:number): Promise<ProfileResponse> {
    const response = await fetch(`https://searchcaster.xyz/api/profiles?fid=${fid}`);
    const data = await response.json();
    const profileData: ProfileResponse = data[0];
    return profileData;
}
export interface Profile {
    id: number;
    address: string;
    username: string;
    displayName: string;
    bio: string;
    followers: number;
    following: number;
    avatarUrl: string;
    isVerifiedAvatar: boolean;
    registeredAt: number;
}
  
export interface ProfileResponse {
    body: Profile;
    connectedAddress: string;
    connectedAddresses: string[];
}