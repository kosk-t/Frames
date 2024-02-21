import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { AppConfig } from './config';
import { Client, sql } from "@vercel/postgres";
import React, { useState, useEffect } from "react";
import App from './page_client';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'FL&💟&🔁 Register!',
    },
    {
      action: 'link',
      label: 'Follow @Kosk',
      target: 'https://warpcast.com/kosk',
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
export const metadata: Metadata = {
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
};

class Row {
  constructor(public id: string, public userName: string, displayName:string) {}
}

export default async function Page() {
  const { rows } = await sql`SELECT * FROM mybook`;

  let client_rows : Row[] = [];

  rows.forEach(element => {
    client_rows.push(new Row(element.id, element.userName, element.displayName))
  });
  const data = JSON.stringify(client_rows);

  return (
    <>
      <h1>Giveaway Tool</h1>
      <App data = {data} />
    </>
  );
}