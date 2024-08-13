import Modal from "react-modal";
import styles from "./ImageModal.module.css";

const ImageModal = ({ isOpen, onRequestClose, image }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    className={styles.modal}
    overlayClassName={styles.overlay}
  >
    <img
      src={image.urls.regular}
      alt={image.alt_description}
      className={styles.image}
    />
    <div className={styles.info}>
      <p>
        <strong>Author: </strong>
        {image.user.name}
      </p>
      <p>
        <strong>Likes: </strong>
        {image.likes}
      </p>
    </div>
    <button onClick={onRequestClose} className={styles.closeButton}>
      X
    </button>
  </Modal>
);

export default ImageModal;
