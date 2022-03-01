import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { contactUser } from "../../../services/social";
import Canvas from "../../../components/Global/Canvas";
import toast from "react-hot-toast";

const contactData = {
  contactId: 0,
  message: "",
};

const Contact = ({ profile, refresh }) => {
  const [contact, setContact] = useState(contactData);

  const { id } = useParams();

  const handleChange = (key, value) => setContact({ ...contact, [key]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tLoading = toast.loading("Sending...");
    const results = await contactUser(contact);
    if (!results.status) {
      return toast.error(results.statusText, { id: tLoading });
    }
    toast.success(results.statusText, { id: tLoading });
    refresh();
  };

  useEffect(() => {
    handleChange("contactId", parseInt(id));
    //eslint-disable-next-line  react-hooks/exhaustive-deps
  }, []);

  return (
    <Canvas
      id="contactCanvas"
      title={`Contacting to ${profile.username}`}
      buttonClass="btn btn-purple btn-sm"
      buttonText="Contact"
      icon="fas fa-paper-plane"
    >
      <form onSubmit={handleSubmit}>
        <textarea
          className="form-control"
          rows={10}
          placeholder={`Send a message to ${profile.fullname}`}
          onChange={(e) => handleChange("message", e.target.value)}
        ></textarea>

        <div className="d-flex justify-content-center mt-4">
          <button className="btn btn-purple">
            Send <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </form>
    </Canvas>
  );
};

export default Contact;
