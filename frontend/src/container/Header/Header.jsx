import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
// import { images } from "../../constants";
import { urlFor, client } from '../../client';
import { AppWrap } from '../../wrapper';
import "./Header.scss";


const Header = () => {
  const [images, setImages] = useState([]); // Array to hold all fetched images
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track current image index

  useEffect(() => {
    // Fetch all images from the gallery schema
    const query = '*[_type == "gallery"]';
    client.fetch(query).then((data) => {
      if (data.length > 0) {
        const galleryImages = data[0].images.map((img) => img); // Access the array of images
        setImages(galleryImages); // Store array of images
      }
    });
  }, []);

  useEffect(() => {
    // Set an interval to cycle through images
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length); // Loop through images
    }, 7000); // Change image every 7 seconds

    return () => clearInterval(intervalId); // Clear interval when component unmounts
  }, [images]); // Only re-run when images array changes

  return (
    <div className="app__header app__flex">
      <motion.div
        whileInView={{ x: [-100, 0], opacity: [0, 1] }}
        transition={{ duration: 0.5 }}
        className="app__header-info"
      >
        <div className="app__header-badge">
          <div className="app__flex">
            <h1 className="head-text">Francesca Fargion</h1>
          </div>
          <div className="tag app__flex">
            <p className="p-text">Composer | Performer</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__header-img"
      >
        {images.length > 0 && (
          <motion.img
            key={currentImageIndex} // Add key to trigger re-render for each image
            src={urlFor(images[currentImageIndex]).url()} // Get the current image URL
            alt={`Gallery Image ${currentImageIndex + 1}`}
            className="app__header-img"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }} // Animate the opacity and scale for the morph effect
            exit={{ opacity: 0, scale: 3 }} // Smooth exit effect
            transition={{ duration: 6, ease: 'easeInOut' }}
          />
        )}
      </motion.div>
    </div>
  );
};

// Wrap Header component
const WrapperHeader = AppWrap(Header, 'home');
export default WrapperHeader;
