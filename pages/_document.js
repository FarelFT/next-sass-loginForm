import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <script
            type='module'
            src='https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js'
          />
          <script
            noModule
            src='https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
