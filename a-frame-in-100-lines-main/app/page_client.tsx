"use client"
import React, { useState, useEffect } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

class Row {
    constructor(public name: string, public custodyaddress: string) {}
  }
  
const App: React.FC<{data:any}> = ({data}) => {
    const [people, setPeople] = useState<Row[]>([]);
    const [open, setOpen] = useState(false);
    const [winner, setWinner] = useState("");
    
    useEffect(() => {
        const rows: Row[] = JSON.parse(data);
        setPeople(rows)
    }, []);
  
    const handlePickWinner = () => {
      const winner = people[Math.floor(Math.random() * people.length)];
      setWinner(winner.name);
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
            <p>Congratulations!</p>
            <p>{winner}</p>
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
              <TableCell>Name</TableCell>
              <TableCell>CustodyAddress</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {people.map((person) => (
              <TableRow key={person.name}>
                <TableCell>{person.name}</TableCell>
                <TableCell>{person.custodyaddress}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    );
  };
  
  export default App;