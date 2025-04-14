
export interface Chapter {
  id: string;
  title: string;
  content: string;
  order: number;
  wordCount: number;
  estimatedReadTime: number;
  createdAt: string;
  updatedAt: string;
  parentId?: string | null;
}

export interface Book {
  id: string;
  title: string;
  description: string;
  coverImageUrl: string;
  authorId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  chapters: Chapter[];
}

export interface ChapterTemplate {
  id: string;
  title: string;
  content: string;
}
