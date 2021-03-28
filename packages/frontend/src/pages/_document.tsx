import Document, {
    DocumentContext,
    DocumentInitialProps,
    Head,
    Html,
    Main,
    NextScript,
} from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(
        ctx: DocumentContext
    ): Promise<DocumentInitialProps> {
        return await Document.getInitialProps(ctx);
    }

    render(): JSX.Element {
        return (
            <Html lang={'ja'}>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
