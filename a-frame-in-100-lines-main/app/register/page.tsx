// "use server"
import App from './page_client';

export default async function Page() {
  // console.log("test")
  return (
    <>
      <App />
    </>
  );
}

export const dynamic = 'force-dynamic';