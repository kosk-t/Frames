"use client"
import React, { useState, useEffect } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Link, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

class Row {
  constructor(public id: string, public userName: string, public displayName:string) {}
  }
  
const App: React.FC<{data:any}> = ({data}) => {
    const [people, setPeople] = useState<Row[]>([]);
    const [open, setOpen] = useState(false);
    const [winner, setWinner] = useState(new Row("", "", ""));
    const [userLink, setLink] = useState("");
    
    useEffect(() => {
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
          Select Winner
        </Button>
        <Dialog open={open} onClose={handleCloseDialog}>
          <DialogTitle>Winner is...</DialogTitle>
          <DialogContent>
            <p>🎉Congratulations!🎉</p>
            <p>fid: {winner.id}</p>
            <center><a href={userLink} target="_blank">{winner.displayName}</a></center>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleCloseDialog}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>UserName</TableCell>
              <TableCell>DisplayName</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {people.map((person) => (
              <TableRow key={person.id}>
                <TableCell>{person.id}</TableCell>
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