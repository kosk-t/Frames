'use client'
import { useState, useEffect } from "react";
import { Button, TextField ,Container, Stack } from "@mui/material";
import { Giveaway } from "../types";

const App: React.FC = () => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [linkLabel, setLinkLabel] = useState("");
  const [startImage, setStartImage] = useState("");
  const [finishImage, setFinishImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleSubmit = async (e:any) => {
    e.preventDefault()
    const giveaway: Giveaway = {id:0, guid:"", title: title, link: link, linkLabel: linkLabel, startImage: startImage, finishImage: finishImage, childCount:0, giveawayurl:""}
    const res = await fetch('/register/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ giveaway }),
    })
    
    //ここでAPIからデータを受けとって
    //setPostedDataでpostedDataに追加している。
    const data = await res.json()
    location.href = "/?guid=" + data.guid;
  }

  return (
    <div>
      <center><h1>Create your giveaway</h1></center>
      <form> 
      <Container maxWidth="sm" sx={{ pt: 5 }}>
      <Stack spacing={3} useFlexGap>
          <TextField
            label="Giveaway Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          /> 
          <TextField
            label="LinkButton URL"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <TextField
            label="LinkButton Label"
            value={linkLabel}
            onChange={(e) => setLinkLabel(e.target.value)}
          />
          <TextField
            label="StartImage URL"
            value={startImage}
            onChange={(e) => setStartImage(e.target.value)}
          />
          <TextField
            label="FinishImage URL"
            value={finishImage}
            onChange={(e) => setFinishImage(e.target.value)}
          />
          <Button color="primary" variant="contained" size="large" disabled={isSubmitting} onClick={handleSubmit} type="submit">
            {isSubmitting ? "Sending..." : "Create"}
          </Button>
      </Stack>
      </Container>
      </form>
    </div>
  );
};

export default App;