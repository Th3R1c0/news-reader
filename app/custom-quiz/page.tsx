'use client';

import { useEffect, useState } from "react";
import ArticlePage from '@/components/ArticleViewer'
import ContentPaster from "@/components/customsources";
export default function CustomUserArticle({ params }) {
  const [articleContent, setArticleContent] = useState("");
  const [articleTitle, setArticleTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);





//   useEffect(() => {
//     const fetchArticleContent = async () => {
//       const url = `https://www3.nhk.or.jp/news/html/${params.slug.replace("-", "/")}.html`;
//       try {
//         const response = await fetch(url);
//         const htmlText = await response.text();
//         const parser = new DOMParser();
//         const doc = parser.parseFromString(htmlText, "text/html");

//         const titleElement = doc.querySelector(".content--title");
//         const contentSection = doc.querySelector(".module--detail-content");

//         if (titleElement) setArticleTitle(titleElement.textContent.trim());
//         if (contentSection) {
//           const content = contentSection.textContent.trim();
//           setArticleContent(content);
//         } else {
//           setArticleContent("Content not found");
//         }
//       } catch (error) {
//         console.error("Error fetching article content:", error);
//         setArticleContent("Error fetching content");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchArticleContent();
//   }, [params.slug]);

  return (
    <ArticlePage 
      
      articleContent={articleContent} 
      articleTitle={articleTitle} 
      isLoading={isLoading} 
    ><ContentPaster content={articleContent} setContent={(e) => setArticleContent(e)}/></ArticlePage>
  );
}