'use client';
import { ArrowUpRightIcon, CalendarIcon } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";

export default function NewsItem({ title, link, pubDate, description,newslink }: any) {
    return (
      <Card className="hover:bg-accent transition-colors h-full">
        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold leading-none tracking-tight text-primary">
                <Link href={link} className="hover:underline">
                  {title}
                </Link>
              </h3>
              <Link href={newslink} className="text-primary hover:text-primary/80">
                <ArrowUpRightIcon className="h-4 w-4" />
                
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