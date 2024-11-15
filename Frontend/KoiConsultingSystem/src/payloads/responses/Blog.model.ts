export interface BlogResponse {
    statusCode: number;
    message: string;
    data: Blog[];
  }
  
  export interface Blog {
    blogId: number;
    blogTitle: string;
    description: string;
    blogImg: string | null;
    blogData: string;
    createDate: string;
    updateDate: string | null;
    status: number;
    destiny: Destiny;
    user: User;
    ratings: Ratings;
    comments: Comments;
  }
  
  export interface Destiny {
    destinyId: number;
    name: string;
  }
  
  export interface User {
    userId: number;
    userCode: string;
    userName: string;
    password: string | null;
    roleId: number;
    createDate: string;
    isActive: boolean;
    status: number;
    fullname: string;
    phone: string | null;
    dob: string | null;
    gender: string | null;
    updateBy: string | null;
    updateDate: string | null;
  }
  
  export interface Ratings {
    rating: number;
  }
  
  export interface Comments {
    comment: number;
  }
  