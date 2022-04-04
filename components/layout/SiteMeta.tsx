// React
import Head from "next/head";
import React, { FC } from "react";

export interface SiteMetaProps {
  meta?: Meta;
}

export interface Meta {
  base: {
    title: string;
    description: string;
  };
  twitter: {
    site: string;
    card: string;
    creator: string;
  };
  og: {
    url: string;
    image: string;
    site_name: string;
    title: string;
    description: string;
  };
}

export const initialMeta: Meta = {
  base: {
    title: "NFT Generate",
    description: "The Free NFT Generate.",
  },
  twitter: {
    site: "@zhangxiangliang",
    creator: "lovefornuo",
    card: "The Free NFT Generate.",
  },
  og: {
    url: "https://github.com/zhangxiangliang/nft-generate",
    image: "",
    site_name: "NFT Generate",
    title: "NFT Generate",
    description: "The Free NFT Generate.",
  },
};

const SiteMeta: FC<SiteMetaProps> = ({
  meta: { twitter, og, base } = initialMeta,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{base.title}</title>

        {/* Base */}
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={base.description} />

        {/* Twitter */}
        <meta name="twitter:site" content={twitter.site} />
        <meta name="twitter:card" content={twitter.card} key="twcard" />
        <meta name="twitter:creator" content={twitter.creator} key="twhandle" />

        {/* Og */}
        <meta property="og:url" content={og.url} key="ogurl" />
        <meta property="og:image" content={og.image} key="ogimage" />
        <meta property="og:title" content={og.title} key="ogtitle" />
        <meta property="og:site_name" content={og.site_name} key="ogsitename" />
        <meta property="og:description" content={og.description} key="ogdesc" />
      </Head>

      {children}
    </>
  );
};

export default SiteMeta;
