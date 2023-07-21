import { PostWithLikes } from '@/components/Feed';
import {create } from 'zustand';


interface State {
    posts: PostWithLikes[];
    setPosts: (newPosts: PostWithLikes) => void;
    deletePost: (postId: string) => void;
    addLikeToPost: (postId: string, authorId: string) => void;
    deleteLikeFromPost: (postId: string, authorId: string) => void;
  }

const usePostStore = create<State>((set) => ({
  posts: [], // Значення за замовчуванням - порожній масив для постів
  setPosts: (newPosts) => set({ posts: newPosts }),
  deletePost: (postId:string) => {
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== postId),
    }));
  },

  addLikeToPost: (postId, authorId) => {
    set((state) => {
      const updatedPosts = state.posts.map((post) =>
        post.id === postId
          ? { ...post, like: [...post.like, { authorId }] }
          : post
      );
      return { posts: updatedPosts };
    });
  },
  

  deleteLikeFromPost: (postId, authorId) => {
    set((state) => {
      const updatedPosts = state.posts.map((post) =>
        post.id === postId
          ? { ...post, like: post.like.filter((like) => like.authorId !== authorId) }
          : post
      );
      return { posts: updatedPosts };
    });
  },
  
}));

export default usePostStore;