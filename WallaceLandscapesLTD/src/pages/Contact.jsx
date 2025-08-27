// src/pages/Contact.jsx
import { useState } from "react";

/* mailto + webmail builders */
const TO = "WallaceLandscapesLTD@gmail.com";
const buildSubject = (name) =>
  `New website inquiry from ${name || "your website"}`;
const buildBody = ({ name, email, phone, message }) =>
  `Name: ${name || ""}
Email: ${email || ""}
Phone: ${phone || "—"}

${message || ""}`;
const buildMailto = (data) =>
  `mailto:${TO}?subject=${encodeURIComponent(buildSubject(data.name))}&body=${encodeURIComponent(
    buildBody(data)
  )}`;
const buildGmail = (data) =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    TO
  )}&su=${encodeURIComponent(buildSubject(data.name))}&body=${encodeURIComponent(
    buildBody(data)
  )}`;
const buildOutlook = (data) =>
  `https://outlook.office.com/mail/deeplink/compose?to=${encodeURIComponent(
    TO
  )}&subject=${encodeURIComponent(buildSubject(data.name))}&body=${encodeURIComponent(
    buildBody(data)
  )}`;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [showHelp, setShowHelp] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <section className="wrap">
      <div className="intro">
        <h1 className="title">Contact Us</h1>
        <p className="lede">
          Have a question or ready to start your landscaping project? Fill out
          the form and we’ll be in touch. You can also reach us directly at{" "}
          <a href={`mailto:${TO}`}>{TO}</a>.
        </p>
      </div>

      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Phone
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(123) 456-7890"
          />
        </label>

        <label>
          Message
          <textarea
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </label>

        {/* Make the button a real mailto link */}
        <a
          className="cta cta-link"
          href={buildMailto(formData)}
          onClick={() => setShowHelp(true)}
          role="button"
        >
          Send Message
        </a>

        {/* Visible fallbacks/help if mail app didn't open */}
        <p className="muted links-row">
          {showHelp ? (
            <>
              Didn’t open? Try{" "}
              <a
                href={buildGmail(formData)}
                target="_blank"
                rel="noreferrer"
              >
                Gmail
              </a>{" "}
              ·{" "}
              <a
                href={buildOutlook(formData)}
                target="_blank"
                rel="noreferrer"
              >
                Outlook Web
              </a>{" "}
              or set your default mail app (see notes below).
            </>
          ) : (
            <>
              Prefer webmail?{" "}
              <a href={buildGmail(formData)} target="_blank" rel="noreferrer">
                Use Gmail
              </a>{" "}
              ·{" "}
              <a
                href={buildOutlook(formData)}
                target="_blank"
                rel="noreferrer"
              >
                Use Outlook Web
              </a>
            </>
          )}
        </p>
      </form>

      <style jsx>{`
        .wrap {
          max-width: 960px;
          margin: 0 auto;
          padding: 48px 20px;
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 32px;
        }

        .intro {
          position: sticky;
          top: 24px;
          align-self: start;
        }
        .title {
          margin: 0 0 12px;
          font-size: clamp(28px, 4vw, 40px);
          line-height: 1.1;
          font-weight: 700;
        }
        .lede {
          margin: 0 0 18px;
          font-size: 16px;
          line-height: 1.6;
          color: #333;
        }
        .lede a {
          color: #2f8a3b;
          text-decoration: none;
          font-weight: 600;
        }
        .lede a:hover {
          text-decoration: underline;
        }

        .form {
          display: grid;
          gap: 18px;
        }
        label {
          display: grid;
          gap: 6px;
          font-size: 14px;
          font-weight: 500;
          color: #444;
        }
        input,
        textarea {
          padding: 10px 12px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 15px;
          font-family: inherit;
        }
        input:focus,
        textarea:focus {
          outline: none;
          border-color: #2f8a3b;
          box-shadow: 0 0 0 2px rgba(47, 138, 59, 0.15);
        }

        .cta {
          justify-self: start;
          padding: 10px 18px;
          border-radius: 6px;
          background: #2f8a3b;
          color: #fff;
          text-decoration: none;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: transform 0.06s ease, opacity 0.2s ease;
          display: inline-block;
        }
        .cta:hover {
          opacity: 0.92;
        }
        .cta:active {
          transform: translateY(1px);
        }
        /* ensure the <a> looks like your button */
        .cta-link {
          appearance: none;
        }

        .links-row {
          margin-top: 8px;
          font-size: 14px;
          color: #666;
        }
        .links-row a {
          color: #2f8a3b;
          text-decoration: none;
          font-weight: 600;
        }
        .links-row a:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .wrap {
            grid-template-columns: 1fr;
          }
          .intro {
            position: static;
          }
        }
      `}</style>
    </section>
  );
}
