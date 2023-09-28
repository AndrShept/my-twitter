import { Like, Post, Comment } from '@prisma/client';

export interface PostLikeAndComments {
  post: Post & { comments: Comment[] } & { likes: Like[] } & {
    _count: { likes: number; comments: number };
  };

}
