export interface Comment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
    comments: Comment[];
    isExpanded: boolean;
}

export const defaultComment = {
    postId: -1,
    id: -1,
    name: '',
    email: '',
    body: ''
};

export const defaultPost = {
    userId: -1,
    id: -1,
    title: '',
    body: '',
    comments: [],
    isExpanded: false
};
