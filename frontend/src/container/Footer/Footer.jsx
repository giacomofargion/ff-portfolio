import  { useState } from 'react';
// import { images } from '../../constants';
import { AppWrap, MotionWrap } from '../../wrapper';
import { TfiEmail } from "react-icons/tfi";
import emailjs from '@emailjs/browser';

import './Footer.scss';

const Footer = () => {
  const [formData, setFormData] = useState({ from_name: '', email: '', message: '' });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { from_name, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent default form submission

    setLoading(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    console.log(publicKey);  // Make sure this is logged correctly

    emailjs.send(serviceId, templateId, {
      from_name: from_name,
      email: email,
      message: message,
    }, publicKey)
    .then(() => {
      setLoading(false);
      setIsFormSubmitted(true);
    })
    .catch((err) => {
      console.error('Error sending email:', err);  // Better error logging
      setLoading(false);
    });
};


  return (
    <>
      <h2 className="head-text">Contact</h2>

      <div className="app__footer-cards">
        <div className="app__footer-card ">
          <TfiEmail className='email-icon' />
          <a href="mailto:francescafargion@gmail.com" className="p-text">francescafargion@gmail.com</a>
        </div>
      </div>

      {!isFormSubmitted ? (
        <div className="app__footer-form app__flex">
          <div className="app__flex">
            <input
              className="p-text"
              type="text"
              placeholder="Your Name"
              name="from_name"
              value={from_name}
              onChange={handleChangeInput}
            />
          </div>
          <div className="app__flex">
            <input
              className="p-text"
              type="email"
              placeholder="Your Email"
              name="email"
              value={email}
              onChange={handleChangeInput}
            />
          </div>
          <div>
            <textarea
              className="p-text"
              placeholder="Your Message"
              value={message}
              name="message"
              onChange={handleChangeInput}
            />
          </div>
          <button type="button" className="p-text" onClick={handleSubmit}>
            {!loading ? 'Send Message' : 'Sending...'}
          </button>
        </div>
      ) : (
        <div>
          <h3 className="p-text">
            Thanks for getting in touch!
          </h3>
        </div>
      )}
    </>
  );
};

const WrappedWork = AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__whitebg',
);
export default WrappedWork;
