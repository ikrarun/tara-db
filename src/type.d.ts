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
      title: string;
      short_desc: string;
      date: Date;
      id: string;
    }[]
  | { code: any; result: boolean };

type Quotes =
  | {
      id: number;
      content: string;
      author: string;
    }
  | {
      code: any;
      result: boolean;
    };

type Suggested_Book =
  | {
      link: string;
      title: string;
      imageUrl: string;
      desc: string;
    }
  | {
      code: any;
      result: boolean;
    };

    
enum Login {
  SINGIN,
  SINGOUT,
};
enum Role {
  USER,
  ADMIN,
  APPLIED,
  EDITOR,
  NOROLE
}