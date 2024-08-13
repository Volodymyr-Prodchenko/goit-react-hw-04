import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import "./App.css";

Modal.setAppElement("#root");

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.unsplash.com/search/photos`,
          {
            params: { query, page, per_page: 12 },
            headers: {
              Authorization:
                "Client-ID E37DJGqelfeJXeCFUJF5valYcwBAC-o4RYexux3DR-k",
            },
          }
        );

        setImages((prevImages) => [...prevImages, ...response.data.results]);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  useEffect(() => {
    const body = document.body;
    if (modalImage) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      body.style.overflow = "hidden";
      body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      body.style.overflow = "";
      body.style.paddingRight = "";
    }
  }, [modalImage]);

  const handleSearchSubmit = (newQuery) => {
    if (newQuery === query) return;
    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setError(null);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (image) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div className="app">
      <SearchBar onSubmit={handleSearchSubmit} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} openModal={openModal} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {modalImage && (
        <ImageModal
          isOpen={!!modalImage}
          onRequestClose={closeModal}
          image={modalImage}
        />
      )}
    </div>
  );
};

export default App;
