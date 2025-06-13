import { Comment } from "@/types";

export type CommentProps = {
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  getCommentList: () => Promise<void>;
};
