
export interface Chapter {
  id: string;
  title: string;
  content: string;
  order: number;
  parentId?: string | null;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  cover?: string;
  description?: string;
  chapters: Chapter[];
  createdAt: string;
  updatedAt: string;
  published: boolean;
}

export type ChapterType = 'introduction' | 'chapter' | 'appendix' | 'bibliography';

export interface ChapterTemplate {
  name: string;
  type: ChapterType;
  content: string;
}
