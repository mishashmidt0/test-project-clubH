import {Html, Head, Main, NextScript} from 'next/document'

export default function Document() {

    return (
        <Html>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={'true'}/>
                <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800&display=swap" rel="stylesheet"/>
                {/* eslint-disable-next-line @next/next/no-title-in-document-head */}
                <title>Clubhouse</title>
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    )
}
