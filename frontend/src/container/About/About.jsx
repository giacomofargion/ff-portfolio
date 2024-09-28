import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { client } from "../../client";
import { AppWrap, MotionWrap } from "../../wrapper";

import "./About.scss";

const About = () => {
  const [abouts, setabouts] = useState([]);

  useEffect(() => {
    const query = '*[_type == "abouts"]';

    client.fetch(query).then((data) => setabouts(data));
  }, []);

  return (
    <motion.div
      whileInView={{ x: [-100, 0], opacity: [0, 1] }}
      transition={{ duration: 2 }}
      viewport={{once: true}}
    >
      <div className="header-container">
        <motion.h2
          className="head-text"
          whileInView={{ x: [-100, 0], opacity: [0, 1] }}
          transition={{ duration: 0.5 }}
          // viewport={{once: true}}
        >
          About
        </motion.h2>
      </div>

      <motion.div
        className="app_bio"
        whileInView={{ x: [-100, 0], opacity: [0, 1] }}
        transition={{ duration: 2 }}
        viewport={{once: true}}
      >
        {abouts.map((about, index) => (
          <p key={index}>{about.bio}</p>
        ))}
      </motion.div>
    </motion.div>
  );
};

const WrappedWrapper = AppWrap(
  MotionWrap(About, "app__about"),
  "about",
  "app__whitebg"
);
export default WrappedWrapper;
