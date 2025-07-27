import "./Footer.css";

export default function Footer({ creditText }) {
  return (
    <footer className="site-footer">
      <div className="image-credit">{creditText}</div>
      <div className="legals">
        <div className="legal-links">
          <a
            href="/legal/privacy-policy.html"
            target="_blank"
            rel="noopener noreferrer">
            Privacy Policy
          </a>
          <a
            href="/legal/terms-of-use.html"
            target="_blank"
            rel="noopener noreferrer">
            Terms of Use
          </a>
          <a
            href="/legal/amazon-disclaimer.html"
            target="_blank"
            rel="noopener noreferrer">
            Amazon Affiliate Disclaimer
          </a>
          <a
            href="/legal/copyright.html"
            target="_blank"
            rel="noopener noreferrer">
            Copyright
          </a>
        </div>
        <p>
          © 2025 Marco Brusca. All rights reserved.{" "}
          <a href="mailto:marco19_70@hotmail.it" rel='me'>Contact me</a>
        </p>
      </div>
    </footer>
  );
}
