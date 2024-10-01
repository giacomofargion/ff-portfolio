import { FaBandcamp, FaTwitter, FaSoundcloud } from "react-icons/fa";

const SocialMedia = () => {
  return (
    <div className="app__social">
      <div>
        <a
          href="https://x.com/ffargion"
          target="_blank"
          rel="noreferrer"
        >
          <FaTwitter />
        </a>
      </div>
      <div>
        <a
          href="https://francescafargion.bandcamp.com/"
          target="_blank"
          rel="noreferrer"
        >
          <FaBandcamp />
        </a>
      </div>
      <div>
        <a
          href="https://soundcloud.com/francesca-fargion"
          target="_blank"
          rel="noreferrer"
        >
          <FaSoundcloud />
        </a>
      </div>
    </div>
  );
};

export default SocialMedia;
