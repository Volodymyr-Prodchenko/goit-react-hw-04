import styles from "./ImageCard.module.css";

const ImageCard = ({ image, openModal }) => {
  return (
    <li className={styles.galleryItem} onClick={() => openModal(image)}>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        className={styles.image}
      />
    </li>
  );
};

export default ImageCard;
