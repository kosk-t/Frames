import { v4 as uuidv4 } from 'uuid';
import { NextRequest, NextResponse } from 'next/server';
import { Giveaway } from '../../types';
import { sql } from "@vercel/postgres";

export async function POST(req: NextRequest): Promise<Response> {
    const json = await req.json()
    const body = json.giveaway;
    console.log(body)
    // console.log(`title : ${body.title}, link : ${body.link}, linkLabel : ${body.linkLabel}`)

    const guid = uuidv4();
    // console.log(title)
    
    // const result = await prisma.giveaway.create({
    //   data:{
    //     guid: guid,
    //     title: data.title,
    //     link:data.link,
    //     linklabel:data.linkLabel,
    //     closed:false
    //   }  
    // });
    const result = await sql`
    INSERT INTO giveaway (guid, title, link, linklabel, closed, startimage, finishimage)
    VALUES (${guid}, ${body.title}, ${body.link}, ${body.linkLabel}, ${false}, ${body.startImage}, ${body.finishImage})
    `;
    // const resultGuid = (await result).guid
    return new Response(JSON.stringify({ guid: guid}))
  }