import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faCaretDown,
  faSearch,
  faCaretRight,
  faCaretLeft,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

export const IconSelector = ({ name }) => {
  switch (name) {
    case "hero-arrow-left":
      return (
        <FontAwesomeIcon
          className="hero-arrow-left"
          icon={faChevronLeft}
          size="4x"
          color="#596E79"
        />
      );
    case "hero-arrow-right":
      return (
        <FontAwesomeIcon
          className="hero-arrow-right"
          icon={faChevronRight}
          size="4x"
          color="#596E79"
        />
      );
    case "hero-process-down":
      return (
        <FontAwesomeIcon
          className="hero-process-down"
          icon={faCaretDown}
          size="4x"
          color="#C7B198"
        />
      );
    case "search-icon":
      return (
        <FontAwesomeIcon
          className="search-icon"
          icon={faSearch}
          size="3x"
          color="#596E79"
        />
      );
    case "page-next":
      return (
        <FontAwesomeIcon
          className="page-next"
          icon={faCaretRight}
          size="3x"
          color="#C7B198"
        />
      );
    case "page-back":
      return (
        <FontAwesomeIcon
          className="page-back"
          icon={faCaretLeft}
          size="3x"
          color="#C7B198"
        />
      );
    case "favorite-undone":
      return (
        <FontAwesomeIcon
          className="favorite-undone"
          icon={faHeart}
          size="2x"
          color="#C4C4C4"
        />
      );
    case "favorite-done":
      return (
        <FontAwesomeIcon
          className="favorite-done"
          icon={faHeart}
          size="2x"
          color="#EA8A8A"
        />
      );
    case "email":
      return (
        <FontAwesomeIcon
          className="email"
          icon={faEnvelope}
          size="3x"
          color="white"
        />
      );
    default:
      return null;
  }
};
