import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { AppConfig } from './config';

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

export default function Page() {
  return (
    <>
      <h1>Kosk Giveaway</h1>
    </>
  );
}
