export interface BlogPost {
  id: number;
  title: string;
  preview: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  count: number;
}