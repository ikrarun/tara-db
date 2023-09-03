type Article =
  | {
      id: string;
      title: string;
      short_desc: string;
      wysiwyg: string;
      date: Date;
    }
  | {
      code: any;
      result: boolean;
    };

type pageParams = {
  params: {
    pid: string;
  };
};

type ArrayArticles =
  | {
      id: string;
      title: string;
      short_desc: string;
      date: Date;
    }[]
  | {
      title: string;
      short_desc: string;
      creator: string | null;
      wysiwyg: string;
      date: Date;
    }
  | null
  | undefined;
type Quotes = {
  id: number;
  content: string;
  author: string;
} | null;

type Suggested_Book = {
  link: string;
  title: string;
  imageUrl: string;
  desc: string;
} | null;
