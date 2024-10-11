import  { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaRegEye } from "react-icons/fa6";

import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";

import "./Work.scss";

const Work = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [works, setWorks] = useState([]);
  const [filterWork, setFilterWork] = useState([]);

  useEffect(() => {
    const query = '*[_type == "works"]';

    client.fetch(query).then((data) => {
      setWorks(data);
      setFilterWork(data);
    });
  }, []);

  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);

      if (item === 'All') {
        setFilterWork(works);
      } else {
        setFilterWork(works.filter((work) => work.tags.includes(item)));
      }
    }, 500);
  };

  return (
    <>
      <div className="header-container">
        <motion.h2
          className="head-text"
          whileInView={{ x: [-100, 0], opacity: [0, 1] }}
          transition={{ duration: 0.5 }}
        >
          Work
        </motion.h2>
      </div>

      <div className="app__work-filter">
        {["Audio", "Video", "Performances", "The Fargions", "All"].map(
          (item, index) => (
            <div
              key={index}
              onClick={() => handleWorkFilter(item)}
              className={`app__work-filter-item app__flex p-text ${
                activeFilter === item ? "item-active" : ""
              }`}
            >
              {item}
            </div>
          )
        )}
      </div>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-portfolio"
      >
        {filterWork.map((work, index) => (
          <div className="app__work-item app__flex" key={index}>
              <a href={work.projectLink} target="_blank" rel="noreferrer">
            <div className="app__work-img app__flex">
                <img src={urlFor(work.imgUrl).url()} alt={work.name} />


              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{
                  duration: 0.25,
                  ease: "easeInOut",
                  staggerChildren: 0.5,
                }}
                className="app__work-hover app__flex"
              >
                <a href={work.projectLink} target="_blank" rel="noreferrer">
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{ duration: 0.25 }}
                    className="app__flex"
                  >
                    <FaRegEye />
                  </motion.div>
                </a>

                <p className="app__flex p-text">
                  {new Date(work.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long", // e.g., September
                    day: "numeric", // e.g., 20
                  })}
                </p>
              </motion.div>
            </div>
            </a>
            <div className="app__work-content app__flex">
              <h4 className="bold-text">{work.title}</h4>
              <p className="p-text" style={{ marginTop: 10 }}>
                {work.description}
              </p>


            </div>
          </div>
        ))}
      </motion.div>
    </>
  );
};

const WrappedWork = AppWrap(
  MotionWrap(Work, 'app__works'),
  'work',
  "app__primarybg"
);
export default WrappedWork;
