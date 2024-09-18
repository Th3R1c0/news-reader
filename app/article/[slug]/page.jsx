'use client';

import ArticlePage from '@/components/ArticleViewer';
import { useEffect, useState } from "react";
import { useAutoAnimate } from '@formkit/auto-animate/react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from '@/components/ui/label';

export default function ViewArticle({ params }) {
  const [articleContent, setArticleContent] = useState("");
  const [articleTitle, setArticleTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [fontSize, setFontSize] = useState("md");

  useEffect(() => {
    const fetchArticleContent = async () => {
      const url = `https://www3.nhk.or.jp/news/html/${params.slug.replace("-", "/")}.html`;
      try {
        const response = await fetch(url);
        const htmlText = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, "text/html");

        const titleElement = doc.querySelector(".content--title");
        const contentSection = doc.querySelector(".module--detail-content");

        if (titleElement) setArticleTitle(titleElement.textContent.trim());
        if (contentSection) {
          const content = contentSection.textContent.trim();
          setArticleContent(content);
        } else {
          setArticleContent("Content not found");
        }
      } catch (error) {
        console.error("Error fetching article content:", error);
        setArticleContent("Error fetching content");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticleContent();
  }, [params.slug]);

  const ArticleUI = (
    <Card className="mb-8 p-6">
      <CardHeader>
        <CardTitle>
          {isLoading ? <Skeleton className="w-3/4 h-9" /> : articleTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <Label htmlFor="font-size">Font Size:</Label>
            <Select value={fontSize} onValueChange={setFontSize}>
              <SelectTrigger id="font-size" className="w-[100px] h-max">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sm">Small</SelectItem>
                <SelectItem value="md">Medium</SelectItem>
                <SelectItem value="lg">Large</SelectItem>
              </SelectContent>
            </Select>
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
          <div className={`prose max-w-none ${fontSize}`}>
            {articleContent.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <ArticlePage articleContent={articleContent} articleTitle={articleTitle} isLoading={isLoading}>
      {ArticleUI}
    </ArticlePage>
  );
}