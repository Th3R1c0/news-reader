'use client';

import {
    Globe,
    Users,
    Microscope,
    Stethoscope,
    Landmark,
    BriefcaseBusiness,
    Dumbbell,
    Paintbrush,
    Globe2,
  } from "lucide-react";

export const genreUrls:any = {
    General: "https://www.nhk.or.jp/rss/news/cat0.xml",
    Society: "https://www.nhk.or.jp/rss/news/cat1.xml",
    Science: "https://www.nhk.or.jp/rss/news/cat3.xml",
    Medicine: "https://www.nhk.or.jp/rss/news/cat4.xml",
    Politics: "https://www.nhk.or.jp/rss/news/cat5.xml",
    Economy: "https://www.nhk.or.jp/rss/news/cat6.xml",
    Sports: "https://www.nhk.or.jp/rss/news/cat7.xml",
    Culture: "https://www.nhk.or.jp/rss/news/cat2.xml",
    International: "https://www.nhk.or.jp/rss/news/cat7.xml",
  };
  

  export const genres = [
    { name: "General", icon: Globe, color: "gray" },
    { name: "Society", icon: Users, color: "blue" },
    { name: "Science", icon: Microscope, color: "green" },
    { name: "Medicine", icon: Stethoscope, color: "red" },
    { name: "Politics", icon: Landmark, color: "purple" },
    { name: "Economy", icon: BriefcaseBusiness, color: "yellow" },
    { name: "Sports", icon: Dumbbell, color: "orange" },
    { name: "Culture", icon: Paintbrush, color: "pink" },
    { name: "International", icon: Globe2, color: "teal" },
  ];
  