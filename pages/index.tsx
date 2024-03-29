import Head from "next/head";
import { Container } from "../components/Container";
export default function Home() {
  return (
    <>
      <Head>
        <title>Markdown to HTML converter</title>
        <meta
          name="description"
          content="Markdown to HTML converter developed by mr_dramm"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container />
    </>
  );
}
