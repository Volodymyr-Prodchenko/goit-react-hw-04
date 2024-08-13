import styles from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onClick }) => (
  <button onClick={onClick} className={styles.loadMoreBtn}>
    Load More
  </button>
);

export default LoadMoreBtn;
