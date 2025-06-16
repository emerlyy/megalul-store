import clsx from "clsx";
import "./Logo.css";

type Props = {
  className?: string;
};

const Logo = ({ className }: Props) => {
  return <div className={clsx("logo", className)}>MEGALUL</div>;
};

export default Logo;
