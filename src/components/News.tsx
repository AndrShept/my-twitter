'use client';
import Image from 'next/image';
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
    <>
      {articles.slice(0, articleCount).map((article) => (
        <a
          key={article.title}
          rel='noreferrer'
          href={article.url}
          target='_blank'
        >
          <div className='flex items-center justify-between px-4 py-2 space-x-1 hover:bg-gray-200 transition duration-500 ease-out'>
            <div className='space-y-0.5'>
              <h6 className='text-sm font-bold line-clamp-2'>
                {article.title}
              </h6>
              <p className='text-xs font-medium text-gray-500'>
                {article.source.name}
              </p>
            </div>
            <img
              className='rounded-lg object-cover h-14 w-20 '
              src={article.urlToImage}
              alt='img'
            />
          </div>
        </a>
      ))}
      <button
        onClick={() => setArticleCount((prev) => prev + 3)}
        className='text-blue-400 pl-4  font-medium hover:text-blue-500  italic'
      >
        show more...
      </button>
      <button
        onClick={() => setArticleCount(-1)}
        className='text-blue-400 pl-4  pb-3 font-medium hover:text-blue-500 block italic'
      >
        show all news...
      </button>
    </>
  );
};
