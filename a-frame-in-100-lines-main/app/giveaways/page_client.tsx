'use client'
import React, { useState, useEffect } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Link, Table, TableBody, TableCell, TableHead, TableRow, Avatar } from "@mui/material";
import { Giveaway } from "../types";

export const imageDisplaySize = { width: 100, height: 100 };
export const styles = {
	imageContainer: {
		'max-width': imageDisplaySize.width,
		'max-height': imageDisplaySize.height,
		marginTop: 10,
		border: '1px solid lightgray'
	}
};

const App: React.FC<{data:any}> = ({data}) => {
  const rows: Giveaway[] = JSON.parse(data);
  return (
    <>
    <p>Total: {rows.length}</p>
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell>Giveaway ID</TableCell>
          <TableCell>Title</TableCell>
          <TableCell>Link</TableCell>
          <TableCell>StartImage</TableCell>
          <TableCell>FinishImage</TableCell>
          <TableCell>Count</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.guid}>
            <TableCell><Link href={row.giveawayurl}>{row.guid}</Link></TableCell>
            <TableCell>{row.title}</TableCell>
            <TableCell><Link href={row.link}>{row.linkLabel}</Link></TableCell>
            <TableCell ><img src={row.startImage} style={styles.imageContainer}></img></TableCell>
            <TableCell><img src={row.finishImage} style={styles.imageContainer}></img></TableCell>
            <TableCell>{row.childCount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </>
  )
};

export default App;