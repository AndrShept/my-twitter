'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

export interface NewsProps {
  source: { id: null | string; name: string };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
}

export const News = ({ articles }: { articles: NewsProps[] }) => {
  const [articleCount, setArticleCount] = useState(3);
  return (
    <div className='mt-4'>
      {articles.slice(0, articleCount).map((article) => (
        <Link
          key={article.title}
          rel='noreferrer'
          href={article.url}
          target='_blank'
        >
          <div className='flex items-center justify-between px-4 py-2 space-x-1 hover:bg-secondary/50 transition '>
            <div className='space-y-0.5'>
              <h6 className='text-sm line-clamp-2'>{article.title}</h6>
              <p className='text-xs  text-muted-foreground/30'>
                {article.source.name}
              </p>
            </div>
            <img
              className='rounded-lg object-cover h-14 w-20 '
              src={article.urlToImage}
              alt='img'
            />
          </div>
        </Link>
      ))}
      <button
        onClick={() => setArticleCount((prev) => prev + 3)}
        className='text-blue-400 pl-4   hover:text-blue-500 mt-2  text-sm '
      >
        show more...
      </button>
      <button
        onClick={() => setArticleCount(-1)}
        className='text-blue-400 pl-4  pb-3  hover:text-blue-500 block  mt-2 text-sm'
      >
        show all news...
      </button>
    </div>
  );
};
