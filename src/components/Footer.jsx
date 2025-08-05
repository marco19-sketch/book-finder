import './Footer.css';

export default function Footer() {


  return (
    <footer className="site-footer">
      <div className="media-credits">
        {" "}
        <p>
          Sound effects obtained from{" "}
          <a
            href="https://www.zapsplat.com"
            target="_blank"
            rel="noopener noreferrer">
            ZapSplat
          </a>
        </p>
        <a
          rel="noreferrer noopener"
          target="_blank"
          href="http://bit.ly/456zxY7">
          Photo by Tima Miroshnichenko
        </a>
        <p>
          {" "}
          Foto di
          <a
            rel="noreferrer noopener"
            target="_blank"
            href="http://bit.ly/3IMARbi">
            Vitaly Gariev
          </a>{" "}
          su{" "}
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="http://bit.ly/3IMB0LS">
            Unsplash
          </a>
        </p>
        {/* <p style={{ fontStyle: "italic", fontSize: "12px" }}>
          As an Amazon Associate, I earn from qualifying purchases
        </p> */}
      </div>
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
          {/* <a
            href="/legal/amazon-disclaimer.html"
            target="_blank"
            rel="noopener noreferrer">
            Amazon Affiliate Disclaimer
          </a> */}
          <a
            href="/legal/copyright.html"
            target="_blank"
            rel="noopener noreferrer">
            Copyright
          </a>
        </div>
        <p className="copyright">
          © 2025 Marco Brusca. All rights reserved.{" "}
          <a href="mailto:marco19_70@hotmail.it" rel="me">
            Contact me
          </a>
        </p>
      </div>
    </footer>
  );
}

