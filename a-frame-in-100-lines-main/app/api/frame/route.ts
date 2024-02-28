import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { AppConfig } from '../../config';
import { sql } from "@vercel/postgres";
import { Profile, ProfileResponse, getProfileData } from './profile';
// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

async function createrow(guid: string, fid: number) : Promise<boolean>{
  // const row = await prisma.mybook.findFirst({
  //   where:{
  //     AND: [
  //       {
  //         fid: {
  //           equals: fid,
  //         }
  //       },
  //       {
  //         guid:{
  //           equals: guid,
  //         }
  //       },
  //     ]
  //   }
  // });

  const {rows} = await sql`SELECT * FROM mybook where fid=${fid} and guid = ${guid}`;

  // console.log("application rows number: " + rows.length)
  if(rows.length == 0){
    // console.log("rows length 0")
    let profileData = await getProfileData(fid);
    // console.log("get profile data")

    const result = await sql`
    INSERT INTO mybook (fid, username, displayname, avatar, guid)
    VALUES (${fid}, ${profileData.body.username}, ${profileData.body.displayName}, ${profileData.body.avatarUrl}, ${guid})
    `;
    console.log("mybook inserted fid: " +fid)
    return true;
  }
  return false;

  // console.log(`exist ? guid = ${guid} && fid = ${fid}`)

  // if(row == null || row == undefined){
  //   await prisma.mybook.create({
  //     data:{
  //       fid: fid,
  //       username: profileData.body.username,
  //       displayname: profileData.body.displayName,
  //       avatar: profileData.body.avatarUrl,
  //       guid: guid,
  //     }
  //   })
  // }
}

async function getResponse(req: NextRequest
  // ,{
  //   params,
  // }: {
  //   params: { guid: string };
  // }
  ): Promise<NextResponse> {
  const guid = req.nextUrl.searchParams.get("guid");
  console.log("route.ts: guid=" + guid)

  let accountAddress: string | undefined = '';
  let following: boolean | undefined = false;
  let liked: boolean | undefined = false;
  let recasted: boolean | undefined = false;

  const body: FrameRequest = await req.json();
  const allowFramegear = AppConfig.VERCEL_ENV !== 'production'; 
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT', allowFramegear:allowFramegear });

  let fid:number = 0;
  let custodyAddress:string = ""
  if (isValid) {
    accountAddress = message.interactor.verified_accounts[0];
    fid = message.interactor.fid;
    custodyAddress = message.interactor.custody_address;
  }
  following = message?.following;
  liked = message?.liked;
  recasted = message?.recasted;

  let label:string = "";
  let post_url:string = "";
  let image_url:string = "";

  const { rows } = await sql`select * from giveaway where guid=${guid}`
  let startImage = AppConfig.START_IMAGE;
  let finishImage = AppConfig.FINISH_IMAGE;
  let linkUrl = "";
  let linkLabel = "";
  if(rows.length != 0){
    const giveaway = rows.at(0);
    linkUrl = giveaway?.link || ""
    linkLabel = giveaway?.linklabel || ""
    const dbStartImage = giveaway?.startimage || null
    if(dbStartImage){
      startImage = dbStartImage;
    }
    const dbFinishImage = giveaway?.finishimage || null
    if(dbFinishImage){
      finishImage = dbFinishImage;
    }
  }
  console.log(`fid: ${fid}, like: ${liked}, recasted: ${recasted}`)
  // if((liked && recasted) || (AppConfig.VERCEL_ENV != "production")){
  if(true){
    const result =  await createrow(guid || "", fid);
    if(result){
      label = "Thanks! Registered.";
    }else{
      label = "Already Registered.";
    }
    post_url = `${AppConfig.NEXT_PUBLIC_URL}/?guid=${guid}`;
    image_url = finishImage
  }else{
    label = "FL💟🔁 Register!"
    post_url = `${AppConfig.NEXT_PUBLIC_URL}/api/frame/?guid=` + guid;
    image_url = startImage
  }
  
  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: label,
        },
        {
          action: 'link',
          label: linkLabel,
          target: linkUrl,
        },
      ],
      image: {
        src: image_url,
        aspectRatio: '1:1'
      },
      postUrl: post_url,
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
