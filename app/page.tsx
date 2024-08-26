'use client';

import Link from 'next/link';
import useSWR from 'swr';
import Parser from 'rss-parser';
import { useState } from 'react';
import {
  CalendarIcon,
  ArrowUpRightIcon,
  Globe,
  Users,
  Dumbbell,
  Stethoscope,
  Heart,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const genres = [
  { name: 'General', icon: Globe, color: 'gray' },
  { name: 'Society', icon: Users, color: 'blue' },
  { name: 'Sports', icon: Dumbbell, color: 'green' },
  { name: 'Medicine', icon: Stethoscope, color: 'red' },
  { name: 'Health', icon: Heart, color: 'purple' },
];

function NewsItem({ title, link, pubDate, description }: any) {
  return (
    <Card className="hover:bg-accent transition-colors">
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold leading-none tracking-tight text-primary">
              <Link href={link} className="hover:underline">
                {title}
              </Link>
            </h3>
            <Link href={link} className="text-primary hover:text-primary/80">
              <ArrowUpRightIcon className="h-4 w-4" />
              <span className="sr-only">Open link</span>
            </Link>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarIcon className="mr-1 h-3 w-3" />
            <time dateTime={pubDate}>
              {new Date(pubDate).toLocaleDateString()}
            </time>
          </div>
          <p className="text-sm text-secondary-foreground line-clamp-2">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

const fetcher = async (url: string) => {
  try {
    // Make a POST request to the API with the URL in the body
    const response = await fetch('/api/getArticle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    // Check if the response is OK
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    // Parse the response as JSON
    const feed = await response.json();

    // Map through items and modify URLs
    return feed.items.map((item: any) => {
      // Match and modify the URL
      const match = item.link.match(/html\/(.+)\.html/);
      const modifiedUrl = match ? match[1].replace('/', '-') : '';

      // Return modified item
      return {
        ...item,
        url: modifiedUrl,
      };
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw the error to be handled by SWR
  }
};

export default function NewsFeed() {
  const [selectedGenre, setSelectedGenre] = useState('General');

  const { data: content, error } = useSWR(
    selectedGenre === 'General'
      ? 'https://www.nhk.or.jp/rss/news/cat0.xml'
      : selectedGenre === 'Society'
      ? 'https://www.nhk.or.jp/rss/news/cat1.xml'
      : selectedGenre === 'Sports'
      ? 'https://www.nhk.or.jp/rss/news/cat3.xml'
      : selectedGenre === 'Medicine'
      ? 'https://www.nhk.or.jp/rss/news/cat4.xml'
      : 'https://www.nhk.or.jp/rss/news/cat5.xml',
    fetcher
  );

  if (error)
    return <p className="text-center text-red-500">Error loading feeds.</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">NHK News Feed</h1>
        <p className="text-xl text-muted-foreground">
          Stay updated with the latest news from Japan
        </p>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-6">
        {genres.map((genre) => (
          <Badge
            key={genre.name}
            variant="outline"
            className={`flex items-center justify-center gap-1 cursor-pointer transition-colors ${
              selectedGenre === genre.name
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-accent hover:text-accent-foreground'
            } text-xs sm:text-sm py-2 px-3`}
            onClick={() => setSelectedGenre(genre.name)}
          >
            <genre.icon className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
            <span>{genre.name}</span>
          </Badge>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mb-4">{selectedGenre} News</h2>

      {!content ? (
        <p className="text-center">Loading...</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.map((item: any, i: any) => (
            <li key={i}>
              <Link href={`/article/${item.url}`}>
                <NewsItem {...item} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
