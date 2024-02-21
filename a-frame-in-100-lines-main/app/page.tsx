import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { AppConfig } from './config';
import { sql } from "@vercel/postgres";
import React, { useState, useEffect } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Register!',
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
    src: `${AppConfig.NEXT_PUBLIC_URL}/park-3.png`,
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
    images: [`${AppConfig.NEXT_PUBLIC_URL}/park-1.png`],
  },
  other: {
    ...frameMetadata,
  },
};

// export default async function Page() {
//   const { rows } = await sql`SELECT * FROM mybook`;

//   let name = "";
//   rows.forEach(element => {
//     name = element.name;
//   });
//   return (
//     <>
//       <h1>Kosk Giveaway</h1>
//       ${name}
//     </>
//   );
// }

const App: React.FC = () => {
  const [people, setPeople] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [winner, setWinner] = useState("");

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=10")
      .then((res) => res.json())
      .then((data) => setPeople(data.results.map((r:any) => `${r.name.first} ${r.name.last}`)));
  }, []);

  const handlePickWinner = () => {
    const winner = people[Math.floor(Math.random() * people.length)];
    setWinner(winner);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Button variant="outlined" onClick={handlePickWinner}>
        当選者を選ぶ
      </Button>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>当選者発表！</DialogTitle>
        <DialogContent>
          <p>おめでとうございます！</p>
          <p>当選者は {winner} さんです！</p>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleCloseDialog}>
            閉じる
          </Button>
        </DialogActions>
      </Dialog>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>名前</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {people.map((person) => (
            <TableRow key={person}>
              <TableCell>{person}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default App;
