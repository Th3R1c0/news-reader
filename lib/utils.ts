import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const fetchRssFeed = async (url: string) => {
  try {
    // Make a POST request to the API with the URL in the body
    const response = await fetch("/api/getArticle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    // Check if the response is OK
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    // Parse the response as JSON
    const feed = await response.json();

    // Map through items and modify URLs
    return feed.items.map((item: any) => {
      // Match and modify the URL
      const match = item.link.match(/html\/(.+)\.html/);
      const modifiedUrl = match ? match[1].replace("/", "-") : "";

      // Return modified item
      return {
        ...item,
        url: modifiedUrl,
      };
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error to be handled by SWR
  }
};