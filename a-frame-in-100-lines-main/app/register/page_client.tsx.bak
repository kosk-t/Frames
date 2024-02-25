// 'use client'
// import { useState, useEffect } from "react";
// import { Button, TextField ,Container, Stack } from "@mui/material";
// import { handleSubmit } from "./page";
// import { Giveaway } from "../types";

// const App: React.FC = () => {
//   const [title, setTitle] = useState("");
//   const [link, setLink] = useState("");
//   const [linkLabel, setLinkLabel] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);

//   useEffect(() => {
//     // フォーム送信後の処理
//     if (isSuccess) {
//       // フォームをリセット
//       setTitle("");
//       setLink("");
//       setLinkLabel("");
//       setIsSuccess(false);
//     }
//   }, [isSuccess]);
//   const giveaway: Giveaway = {title: title, link: link, linkLabel: linkLabel}
//   const updateHandleSubmit = handleSubmit.bind(null, giveaway)

//   return (
//     <div>
//       <center><h1>Register your giveaway</h1></center>
//       <form action={updateHandleSubmit}> 
//       <Container maxWidth="sm" sx={{ pt: 5 }}>
//       <Stack spacing={3} useFlexGap>
//           <TextField
//             label="Giveaway Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           /> 
//           <TextField
//             label="Link URL"
//             value={link}
//             onChange={(e) => setLink(e.target.value)}
//           />
//           <TextField
//             label="Link Label"
//             value={linkLabel}
//             onChange={(e) => setLinkLabel(e.target.value)}
//           />
//           <Button color="primary" variant="contained" size="large" disabled={isSubmitting} type="submit">
//             {isSubmitting ? "Sending..." : "Create"}
//           </Button>
//       </Stack>
//       </Container>
//       </form>
//     </div>
//   );
// };

// export default App;