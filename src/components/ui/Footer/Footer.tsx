import Logo from "../Logo/Logo";
import Text from "../Text/Text";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer__body">
        <div className="footer__left">
          <Logo className="footer__logo" />
          <Text
            className="footer__copyright"
            tag="div"
            color="light"
            weight="semibold"
          >
            Copyright 2025. All Rights Reserved
          </Text>
        </div>

        <div className="footer__links">
          <Text
            className="footer__links-title"
            color="text-secondary"
            tag="div"
          >
            Links
          </Text>
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

        <div className="footer__contacts">
          <div className="footer__contacts-body">
            <Text color="text-secondary" size="large">
              Contacts:
            </Text>
            <Text color="text-secondary" className="footer__phone">
              +38 044 242 34 72
            </Text>
            <Text color="light" className="footer__email">
              shopping@megalul.com
            </Text>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
