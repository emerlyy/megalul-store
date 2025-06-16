import clsx from "clsx";
import type { MouseEvent } from "react";
import { Link, useNavigate } from "react-router";
import Text from "../ui/Text/Text";
import "./GoBackButton.css";

type GoBackLinkProps = {
  className?: string;
};

const GoBackButton = ({ className }: GoBackLinkProps) => {
  const navigate = useNavigate();

  function handleGoBack(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    // 💡 Verify if previous page exists before using router.back
    const hasPreviousPage = window.history.length > 2;

    if (hasPreviousPage) {
      navigate(-1);
    } else {
      navigate("..");
    }
  }

  return (
    <Link
      to={".."}
      onClick={handleGoBack}
      className={clsx("go-back", className)}
    >
      <Text tag="span" color="light" size="regular">
        Go Back
      </Text>
    </Link>
  );
};

export default GoBackButton;
