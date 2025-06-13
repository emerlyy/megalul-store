import Logo from "../Logo/Logo";
import Text from "../Text/Text";
import Title from "../Title/Title";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer__body">
        <Logo className="footer__logo" />
        <Text color="light" size="large" className="footer__email">
          shopping@megalul.com
        </Text>
        <div className="footer__links">
          <Title
            className="footer__links-title"
            color="text-secondary"
            size="small"
            tag="div"
          >
            Company
          </Title>
          <ul className="footer__links-list">
            <li>
              <Text className="footer__links-item" color="text-secondary">
                About us
              </Text>
            </li>
            <li>
              <Text className="footer__links-item" color="text-secondary">
                Location
              </Text>
            </li>
            <li>
              <Text className="footer__links-item" color="text-secondary">
                Careers
              </Text>
            </li>
          </ul>
        </div>
        <Text
          className="footer__copyright"
          tag="div"
          color="light"
          weight="semibold"
        >
          Copyright 2025. All Rights Reserved
        </Text>
      </div>
    </footer>
  );
};

export default Footer;
