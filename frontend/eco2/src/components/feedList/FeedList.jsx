import React from "react";
import { useSelector } from "react-redux";
import FeedItem from "../feedItem/FeedItem";
import styles from "./FeedList.module.css";

const FeedList = ({ category, display }) => {
  const feedList = useSelector((state) => state.feed);
  const displayType = display === "list" ? styles.list : styles.grid;
  return (
    <div className={styles.container}>
      <div className={displayType}>
        {feedList.map(
          (feed) =>
            category === feed.category && (
              <FeedItem
                key={feed.id}
                id={feed.id}
                user={feed.user}
                category={feed.category}
                content={feed.content}
                src={feed.src}
              />
            )
        )}
      </div>
    </div>
  );
};

export default FeedList;