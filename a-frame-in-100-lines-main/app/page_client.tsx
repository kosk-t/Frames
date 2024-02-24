"use client"
import React, { useState, useEffect } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Link, Table, TableBody, TableCell, TableHead, TableRow, Avatar } from "@mui/material";
import { Row } from './types';
  
const App: React.FC<{data:any}> = ({data}) => {
    const [people, setPeople] = useState<Row[]>([]);
    const [open, setOpen] = useState(false);
    const [winner, setWinner] = useState(new Row(0, 0, "", "", ""));
    const [userLink, setLink] = useState("");
    const [warpcastLink, setWarpcastLink] = useState("");
    
    useEffect(() => {
      let currentUrl = location.href;
      setWarpcastLink("https://warpcast.com/~/compose?embeds[]=" + currentUrl)
      const rows: Row[] = JSON.parse(data);
        setPeople(rows)
    }, []);
  
    const handlePickWinner = () => {
      const winner = people[Math.floor(Math.random() * people.length)];
      setWinner(winner);
      setLink("https://warpcast.com/" + winner.userName)
      setOpen(true);
    };
  
    const handleCloseDialog = () => {
      setOpen(false);
    };
  
    return (
      <Box>
        <Button variant="outlined" onClick={handlePickWinner}>
        🎉Select Winner
        </Button>
        <Button variant="outlined" LinkComponent={Link} href={warpcastLink} target="_blank">
        🎩Cast this Giveaway
        </Button>
        <Button variant="outlined" LinkComponent={Link} href="/register">
        🎁Create New Giveaway
        </Button>
        <p>Total: {people.length}</p>
        <Dialog open={open} onClose={handleCloseDialog}>
          <DialogTitle>Winner is...</DialogTitle>
          <DialogContent>
          <center><p>🎉Congratulations!🎉</p>
            <p>fid: {winner.fid}</p>
            <Avatar alt={winner.userName} src={winner.avatar} /><a href={userLink} target="_blank">{winner.displayName}</a>
          </center>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleCloseDialog}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>FID</TableCell>
              <TableCell>UserName</TableCell>
              <TableCell>DisplayName</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {people.map((person) => (
              <TableRow key={person.fid}>
                <TableCell><Avatar alt={person.userName} src={person.avatar} /></TableCell>
                <TableCell>{person.fid}</TableCell>
                <TableCell>{person.userName}</TableCell>
                <TableCell>{person.displayName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    );
  };
  
  export default App;