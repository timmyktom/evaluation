import { ActionReducer, Action } from '@ngrx/store';
import { SET_SELECTED_USER } from '../shared/actions';
import * as PostsActions from './posts.actions';
import { Post, defaultPost } from './posts.model';

export interface PostState {
    postList: Post[];
    filteredPostList: Post[];
    isPostListLoading: boolean;
    isError: boolean;
    showAll: boolean;
}

export const initialPostState: PostState = {
    postList: [],
    filteredPostList: [],
    isPostListLoading: false,
    isError: false,
    showAll: false
};

export function PostsReducer(state = initialPostState, action: PostsActions.PostsActions): PostState {
    let newState: PostState;
    switch (action.type) {
        case SET_SELECTED_USER:
            newState = {...state,
                postList: [],
                filteredPostList: [],
                isPostListLoading: true,
                isError: false,
                showAll: false
            };
            return newState;
        case PostsActions.GET_USERS_POSTS_SUCCESS:
            newState = {...state,
                postList: getPosts(action.payload),
                isPostListLoading: false,
                showAll: false,
                isError: false
            };
            newState.filteredPostList = getFirstThreePosts(newState.postList);
            return newState;
        case PostsActions.GET_USERS_POSTS_ERROR:
            newState = {...state,
                isPostListLoading: false,
                isError: true
            };
            return newState;
        case PostsActions.SHOW_ALL_POST:
            newState = {...state,
                showAll: true,
                filteredPostList: [...state.postList]
            };
            return newState;
        case PostsActions.GET_POST_COMMENTS:
            const indexPost = state.postList.findIndex(pst => pst.id === action.payload);
            if (indexPost !== -1) {
                state.postList[indexPost].isExpanded = true;
                state.postList[indexPost].isCommentsLoading = true;
            }
            newState = {
                ...state,
                filteredPostList: state.showAll ? [...state.postList] : getFirstThreePosts(state.postList)
            };
            return newState;
        case PostsActions.GET_POST_COMMENTS_SUCCESS:
            const indexPostComment = state.postList.findIndex(pst => pst.id === action.payload[0].postId);
            if (indexPostComment !== -1) {
                state.postList[indexPostComment].comments = action.payload;
                state.postList[indexPostComment].isCommentsLoading = false;
            }
            newState = {
                ...state,
                filteredPostList: state.showAll ? [...state.postList] : getFirstThreePosts(state.postList)
            };
            return newState;
        case PostsActions.GET_POST_COMMENTS_ERROR:
            newState = {...state,
                isError: true
            };
            return newState;
        case PostsActions.CLOSE_POST_COMMENTS:
            const indexPostCommetClose = state.postList.findIndex(pst => pst.id === action.payload);
            if (indexPostCommetClose !== -1) {
                state.postList[indexPostCommetClose].isExpanded = false;
            }
            newState = {
                ...state,
                filteredPostList: state.showAll ? [...state.postList] : getFirstThreePosts(state.postList)
            };
            return newState;
        default:
            return state;
    }
}

function getPosts(postList) {
    return postList.map(post => {
        return {
            ...post,
            comments: [],
            isExpanded: false,
            isCommentsLoading: false
        };
    });
}

function getFirstThreePosts(postList) {
    if (postList.length > 3) {
        return postList.slice(0, 3);
    } else {
        return postList;
    }
}
