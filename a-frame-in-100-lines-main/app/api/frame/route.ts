import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { AppConfig } from '../../config';
import { sql } from "@vercel/postgres";
import { Profile, ProfileResponse, getProfileData } from './profile';
// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

async function createrow(guid: string, fid: number){
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

  const {rows} = await sql`SELECT * FROM mybook where id=${fid} and guid = ${guid}`;

  if(rows.length == 0){
    let profileData = await getProfileData(fid);

    const insertQuery = sql`
    INSERT INTO mybook (id, username, displayname, avatar, guid)
    VALUES (${fid}, ${profileData.body.username}, ${profileData.body.displayName}, ${profileData.body.avatarUrl}, ${guid})
    `;
    const result = await insertQuery
  }

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
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

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
  if((liked && recasted) || (AppConfig.VERCEL_ENV != "produciton")){
  // if(true){
    label = "Thanks!";
    post_url = `${AppConfig.NEXT_PUBLIC_URL}/?guid=${guid}`;
    image_url = "/2024-02-22 00.50.21.webp";
    createrow(guid || "", fid);
  }else{
    label = "FL&💟&🔁 Register!"
    post_url = `${AppConfig.NEXT_PUBLIC_URL}/api/frame/?guid=` + guid;
    image_url = "/20ef4c3c-406d-4d5d-83e6-2cb62bf70f0a.webp"
  }


  // if (message?.input) {
  //   text = message.input;
  // }

  // if (message?.button === 3) {
  //   return NextResponse.redirect(
  //     'https://www.google.com/search?q=cute+dog+pictures&tbm=isch&source=lnms',
  //     { status: 302 },
  //   );
  // }

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: label,
        },
        {
          action: 'link',
          label: 'Follow @Kosk',
          target: 'https://warpcast.com/kosk',
        },
      ],
      image: {
        src: `${AppConfig.NEXT_PUBLIC_URL}${image_url}`,
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
