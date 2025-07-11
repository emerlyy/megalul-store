import { Link } from "react-router";
import Cart from "../../Cart/Cart";
import CategoriesSelector from "../../CategoriesSelector/CategoriesSelector";
import Search from "../../Search/Search";
import Logo from "../Logo/Logo";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="container header__inner">
        <div className="header__left">
          <Link to="/">
            <Logo />
          </Link>
          <CategoriesSelector />
          <Search />
        </div>
        <Cart />
      </div>
    </header>
  );
};

export default Header;
