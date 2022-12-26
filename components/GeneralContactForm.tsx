import { message } from "antd";
import React, { useState } from "react";
import {
  Fieldset,
  StyledLabel,
  StyledInput,
  StyledTextarea,
} from "./Forms/styles";

export const GeneralContactForm = ({ subject = "Contact Us" }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
    subject: subject,
  });
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const res = await fetch("/api/contact", {
          method: "POST",
          body: JSON.stringify({ ...contactForm }),
        });
        if (res.status === 200) {
          message.success("Message sent! We'll get back to you soon.");
          setContactForm({
            name: "",
            email: "",
            message: "",
            subject: subject,
          });
        }
        setIsLoading(false);
      }}
    >
      <Fieldset disabled={isLoading}>
        <StyledLabel htmlFor="name">Name</StyledLabel>
        <StyledInput
          required
          type="text"
          name="name"
          id="name"
          value={contactForm.name}
          onChange={(e) => {
            setContactForm({ ...contactForm, name: e.target.value });
          }}
        />
        <StyledLabel htmlFor="email">Email</StyledLabel>
        <StyledInput
          required
          type="email"
          name="email"
          id="email"
          value={contactForm.email}
          onChange={(e) => {
            setContactForm({ ...contactForm, email: e.target.value });
          }}
        />
        <StyledLabel htmlFor="message">Message</StyledLabel>
        <StyledTextarea
          name="message"
          id="message"
          value={contactForm.message}
          onChange={(e) => {
            setContactForm({ ...contactForm, message: e.target.value });
          }}
        />
        <StyledInput
          type="submit"
          value={isLoading ? "Sending Message" : "Send Message"}
        />
      </Fieldset>
    </form>
  );
};
