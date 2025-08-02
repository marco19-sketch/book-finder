import PropTypes from 'prop-types';

const AmazonLink = ({ title, author}) => {
    if (!title) return null;

    const generateAmazonLink = (title, author) => {
        const baseUrl = 'https://www.amazon.it/s';
        const query = encodeURIComponent(`${title} ${author || ''}`);
        const tag = "bookfinderita-21 ";
        return `${baseUrl}?k=${query}&tag=${tag}`;
    };

    const link = generateAmazonLink(title, author);
    console.log('amazon link', link)
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="amazon-buy-link"
        onClick={() => {
          console.log("Clicked Amazon link for:", title);
        }}>
        🔗 Acquista su Amazon
      </a>
    );
};

AmazonLink.propTypes = {
    title: PropTypes.string.isRequired,
    author: PropTypes.string
};

export default AmazonLink;