'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Moon, Sun } from 'lucide-react';
import Link from 'next/link';

export default function ViewArticle({ params }) {
  const [articleContent, setArticleContent] = useState('');
  const [articleTitle, setArticleTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [wordCount, setWordCount] = useState(0);
  const [fontSize, setFontSize] = useState('md');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const slug = params.slug.replace('-', '/');

  useEffect(() => {
    const fetchArticleContent = async () => {
      const url = `https://www3.nhk.or.jp/news/html/${slug}.html`;
      try {
        const response = await fetch(url);
        const htmlText = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');

        const titleElement = doc.querySelector('.content--title');
        const contentSection = doc.querySelector('.module--detail-content');

        if (titleElement) setArticleTitle(titleElement.textContent.trim());
        if (contentSection) {
          const content = contentSection.textContent.trim();
          setArticleContent(content);
          setWordCount(content.length);
        } else {
          setArticleContent('Content not found');
        }
      } catch (error) {
        console.error('Error fetching article content:', error);
        setArticleContent('Error fetching content');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticleContent();
  }, [slug]);

  const fontSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-2xl',
  };

  return (
    <div className={`container mx-auto px-4 py-8 ${isDarkMode ? 'dark' : ''}`}>
      <header className="">
        <Link
          href="/"
          className="inline-flex items-center text-primary hover:text-primary/80 mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to News Feed
        </Link>
      </header>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>
            {isLoading ? <Skeleton className="w-3/4 h-9" /> : articleTitle}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap  items-center gap-4 mb-6">
            <div className="flex items-center space-x-2 ">
              <Label htmlFor="font-size">Font Size:</Label>
              <Select value={fontSize} onValueChange={setFontSize}>
                <SelectTrigger id="font-size" className="w-[100px]">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sm">Small</SelectItem>
                  <SelectItem value="md">Medium</SelectItem>
                  <SelectItem value="lg">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="dark-mode">Dark Mode:</Label>
              <Switch
                id="dark-mode"
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Label>Word Count:</Label>
              <span className="font-medium">{wordCount}</span>
            </div>
          </div>
          {isLoading ? (
            <>
              <Skeleton className="w-full h-4 mb-2" />
              <Skeleton className="w-full h-4 mb-2" />
              <Skeleton className="w-full h-4 mb-2" />
              <Skeleton className="w-3/4 h-4" />
            </>
          ) : (
            <div
              className={`prose max-w-none ${fontSizeClasses[fontSize]} ${
                isDarkMode ? 'dark:prose-invert' : ''
              }`}
            >
              {articleContent.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
