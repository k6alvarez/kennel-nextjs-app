import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="preload"
            href="/fonts/Dancing_Script/DancingScript-Regular.ttf"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/Lato/Lato-Regular.ttf"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/Lato/Lato-Black.ttf"
            as="font"
            crossOrigin=""
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
        <script src="https://www.paypal.com/sdk/js?client-id=AbLaJ0f3j-sjyIj049RDVvjvpXztrcmwSqbBH4Yla0g9rUJ7O-6M_-gMFc4FxN8uXBfJJCLOkFvOsaJQ"></script>
      </Html>
    );
  }
}

export default MyDocument;
