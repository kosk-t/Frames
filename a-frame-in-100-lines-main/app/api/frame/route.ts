import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { AppConfig } from '../../config';
import { sql } from "@vercel/postgres";
import { getFarcasterUserAddress } from '@coinbase/onchainkit/src/farcaster';


async function getResponse(req: NextRequest): Promise<NextResponse> {
  // const { rows } = await sql`SELECT * FROM mybook`;

  // let name = "";
  // rows.forEach(element => {
  //   name = element.name;
  // });

  let accountAddress: string | undefined = '';
  let following: boolean | undefined = false;
  let liked: boolean | undefined = false;
  let recasted: boolean | undefined = false;
  // let text: string | undefined = '';

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
  
  const userAddress = await getFarcasterUserAddress(fid, {
    neynarApiKey: 'NEYNAR_ONCHAIN_KIT', 
  });
  
  const { rows } = await sql`SELECT * FROM mybook where name=${fid}`;
  if(rows.length == 0){
    const insertQuery = sql`
    INSERT INTO mybook (name, custodyaddress)
    VALUES (${fid}, ${custodyAddress})
    `;
    const result = await insertQuery
  }

  let label:string = "";
  let post_url:string = "";
  if(following && liked && recasted){
  // if(true){
    label = "Thanks!";
    post_url = `${AppConfig.NEXT_PUBLIC_URL}`;
  }else{
    label = "FL&💟&🔁 Register!"
    post_url = `${AppConfig.NEXT_PUBLIC_URL}/api/frame`;
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
        src: `${AppConfig.NEXT_PUBLIC_URL}/20ef4c3c-406d-4d5d-83e6-2cb62bf70f0a.webp`,
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
