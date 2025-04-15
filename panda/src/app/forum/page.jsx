import React from "react";
import BestPost from "./BestPost";
import Post from "./Post";
import styles from "./Post.module.scss";

function ForumPage() {
  return (
    <main className="p-[32px]">
      <BestPost />
      <Post />
    </main>
  );
}

export default ForumPage;
