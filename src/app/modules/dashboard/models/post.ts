import { Category } from "./category";

export interface Post {
  _id: string;
  title: string;
  status: string;
  content: string;
  categories: Category[];
  created_by: any;
  createdAt: Date;
}

export interface SinglePost {
  _id: string;
  title: string;
  status: string;
  content: string;
  categories: string[];
  created_by: any;
  createdAt: Date;
}