import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { AppConfig } from './config';
import App from './page_client';
import { Row } from './types';
import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';
import { getuid } from 'process';
import { useRouter } from "next/router";

const prisma = new PrismaClient()

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const generateMetadata = async ({ params, searchParams }: Props): Promise<Metadata> => {
  const guid : string = searchParams.guid?.toString() || "";
  const giveaway = await prisma.giveaway.findFirst({
    where:{
      guid: guid
    }
  })

  const frameMetadata =  getFrameMetadata({
    buttons: [
      {
        label: 'FL&💟&🔁 Register!',
      },
      {
        action: 'link',
        label: giveaway?.linklabel || "",
        target: giveaway?.link || "",
      },
      // {
      //   label: 'Redirect to pictures',
      //   action: 'post_redirect',
      // },
    ],
    image: {
      src: `${AppConfig.NEXT_PUBLIC_URL}/20ef4c3c-406d-4d5d-83e6-2cb62bf70f0a.webp`,
      aspectRatio: '1:1',
    },
    // input: {
    //   text: 'Tell me a boat story',
    // },
    postUrl: `${AppConfig.NEXT_PUBLIC_URL}/api/frame`,
  });
  
  let title:string = 'Kosk Giveaway'
  let description:string = 'Enjoy!'

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: [`${AppConfig.NEXT_PUBLIC_URL}/20ef4c3c-406d-4d5d-83e6-2cb62bf70f0a.webp`],
    },
    other: {
      ...frameMetadata,
    },
  }
}


// const frameMetadata = getFrameMetadata({
//   buttons: [
//     {
//       label: 'FL&💟&🔁 Register!',
//     },
//     {
//       action: 'link',
//       label: 'Follow @Kosk',
//       target: 'https://warpcast.com/kosk',
//     },
//     // {
//     //   label: 'Redirect to pictures',
//     //   action: 'post_redirect',
//     // },
//   ],
//   image: {
//     src: `${AppConfig.NEXT_PUBLIC_URL}/20ef4c3c-406d-4d5d-83e6-2cb62bf70f0a.webp`,
//     aspectRatio: '1:1',
//   },
//   // input: {
//   //   text: 'Tell me a boat story',
//   // },
//   postUrl: `${AppConfig.NEXT_PUBLIC_URL}/api/frame`,
// });

// let title:string = 'Kosk Giveaway'
// let description:string = 'Enjoy!'
// export const metadata: Metadata = {
//   title: title,
//   description: description,
//   openGraph: {
//     title: title,
//     description: description,
//     images: [`${AppConfig.NEXT_PUBLIC_URL}/20ef4c3c-406d-4d5d-83e6-2cb62bf70f0a.webp`],
//   },
//   other: {
//     ...frameMetadata,
//   },
// };

export default async function Page({searchParams}: {searchParams: {guid: string}}) {
  // console.log(searchParams.guid);
  const rows = await prisma.mybook.findMany({
    where:
      {
        guid: searchParams.guid
      }
    }
  );

  let client_rows : Row[] = [];
  // console.log(AppConfig.NEXT_PUBLIC_URL)

  rows.forEach(element => {
    // console.log(element)
    client_rows.push(new Row(element.id, element.fid, element.username, element.displayname, element.avatar))
  });
  const data = JSON.stringify(client_rows);
  const giveaway = await prisma.giveaway.findFirst({
    where:{
      guid: searchParams.guid
    }
  })

  return (
    <>
      <h1>Giveaway Tool</h1>
      <h2>{giveaway?.title}</h2>

      <App data = {data} />
    </>
  );
}

export const dynamic = 'force-dynamic';



// select * from information_schema.columns where table_name='mybook' order by ordinal_position;

// create table mybook(
// id serial,
// giveaway varchar(50),
// fid integer,
// username varchar(50),
// displayname text,
// avatar text
// )

// create table giveaway(
// id serial,
// guid varchar(50),
// title text,
// link text,
// linklabel text,
// closed boolean
// )

// delete from mybook where id = 18066

// npm prisma generate
// npm run dev

// DELETE FROM giveaway