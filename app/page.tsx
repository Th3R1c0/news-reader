"use client";

import Link from "next/link";
import useSWR from "swr";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { genreUrls, genres } from "@/lib/constants";
import NewsItem from "@/components/newsitems";
import { fetchRssFeed } from "@/lib/utils";
import Footer from "@/components/footer";
import { Pencil } from "lucide-react";



const LoadingSkeleton = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {[...Array(6)].map((_, i) => (
      <Card key={i}>
        <CardContent className="p-4">
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-4" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    ))}
  </div>
  )
}



export default function NewsFeed() {
  const [selectedGenre, setSelectedGenre] = useState<any>("General");

  const { data: content, error } = useSWR(
    genreUrls[selectedGenre] || genreUrls["General"],
    fetchRssFeed
  );

  if (error)
    return <p className="text-center text-red-500">Error loading feeds.</p>;
  



  return (
    <div className="container mx-auto px-4 py-8 ">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">AI-Powered News Comprehension App</h1>
        <p className="text-xl text-muted-foreground">
          Read the news and take AI-generated quizzes to test your comprehension
        </p> {/* Updated subtitle */}
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-6">
        {genres.map((genre) => (
          <Badge
            key={genre.name}
            variant="outline"
            className={`flex items-center justify-center gap-1 cursor-pointer transition-colors ${
              selectedGenre === genre.name
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent hover:text-accent-foreground"
            } text-xs sm:text-sm py-2 px-3`}
            onClick={() => setSelectedGenre(genre.name)}
          >
            <genre.icon className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
            <span>{genre.name}</span>
          </Badge>
        ))}
                <Link href="/custom-quiz">
                  <Badge
                    key="custom"
                    variant="outline"
                    className={`flex items-center justify-center gap-1 cursor-pointer transition-colors bg-gradient-to-r from-pink-500 to-yellow-500 text-primary-foreground text-xs sm:text-sm py-2 px-3`}
                  >
                    <Pencil className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span>Custom Text</span>
                  </Badge>
                </Link>
      </div>

      <h2 className="text-2xl font-semibold mb-4">{selectedGenre} News</h2>

      {!content ? (
        <LoadingSkeleton />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3  ">
          {content.map(
            ({ title, link, pubDate, description, url }: any, i: any) => (
              <li key={i} className="">
                <Link href={`/article/${url}`}>
                  <NewsItem
                    title={title}
                    link={`/article/${url}`}
                    pubDate={pubDate}
                    newslink={`/article/${url}`}
                    description={description}
                  />
                </Link>
              </li>
            )
          )}
        </ul>
      )}
      {/* <Footer/> */}
    </div>
  );
}
