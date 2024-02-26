// "use server"
import { env } from 'process';
import { Giveaway } from '../types';
import App from './page_client';
import { sql } from "@vercel/postgres";
import { AppConfig } from '../config';

export default async function Page() {
  const { rows } = await sql`
  SELECT
  giveaway.id,
  giveaway.guid,
  giveaway.title,
  giveaway.link,
  giveaway.linkLabel,
  giveaway.startImage,
  giveaway.finishImage,
  COUNT(mybook.id) AS child_count
  FROM giveaway
  LEFT JOIN mybook ON giveaway.guid = mybook.guid
  GROUP BY giveaway.id, giveaway.guid, giveaway.title, giveaway.link, giveaway.linklabel, giveaway.startimage, giveaway.finishimage
  `
  let client_rows : Giveaway[] = [];
  rows.forEach(element => {
      client_rows.push({
        id: element.id,
        guid: element.guid,
        title: element.title,
        link: element.link,
        linkLabel: element.linklabel,
        startImage: element.startimage,
        finishImage: element.finishimage,
        childCount: element.child_count,
        giveawayurl: AppConfig.NEXT_PUBLIC_URL + "/?guid=" + element.guid,
      })
    });
  client_rows.sort((a, b) => a.id - b.id)
  const data = JSON.stringify(client_rows);

  // console.log("test")
  return (
    <>
      <h1>Giveaways</h1>
      <App data={data} />
    </>
  );
}

export const dynamic = 'force-dynamic';