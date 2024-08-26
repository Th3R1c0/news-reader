import { NextResponse } from "next/server";
import Parser from "rss-parser";

export async function POST(req: any) {
  // Get the body
  const { url } = await req.json();
      const parser = new Parser();
      const feed = await parser.parseURL(url);

        return Response.json(feed)

    // return Response.json({ data })
  }