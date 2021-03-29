import React from 'react';
import Head from 'next/head';

interface HeadTagProps {
    title: string;
    description?: string;
    image?: string;
    url: string;
}

export const HeadTag: React.FC<HeadTagProps> = ({
    title,
    description,
    image,
    url,
}) => {
    const defaultImageUrl = 'https://tokenized-url.vercel.app/ogp.png';
    const defaultDescription = 'Tokenize Url - Emotional feelings forever.';

    const imageUrl = image ? image : defaultImageUrl;
    const desc = description ? description : defaultDescription;

    return (
        <Head>
            <title>{title}</title>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0, viewport-fit=cover"
            />
            <meta property="description" content={desc} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={desc} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={imageUrl} />
            <meta property="og:site_name" content={title} />
            <meta property="og:locale" content="ja_JP" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@noplan_inc" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={desc} />
            <meta name="twitter:image" content={imageUrl} />
            <meta name="fb:app_id" content={''} />
            <link rel="canonical" href={url} />
        </Head>
    );
};
