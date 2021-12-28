import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faCaretDown,
  faSearch,
  faCaretRight,
  faCaretLeft,
  faHeart,
  faTimesCircle,
  faEye,
  faEyeSlash,
  faCaretUp,
  faTrashAlt,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";
import {
  faEnvelope,
  faEnvelopeOpen,
} from "@fortawesome/free-regular-svg-icons";

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
          color="#c7b198"
        />
      );
    case "search-icon":
      return (
        <FontAwesomeIcon
          className="search-icon"
          icon={faSearch}
          size="2x"
          color="#596E79"
        />
      );
    case "page-next":
      return (
        <FontAwesomeIcon
          className="page-next"
          icon={faCaretRight}
          size="3x"
          color="#c7b198"
        />
      );
    case "page-back":
      return (
        <FontAwesomeIcon
          className="page-back"
          icon={faCaretLeft}
          size="3x"
          color="#c7b198"
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
    case "close":
      return (
        <FontAwesomeIcon
          className="close"
          icon={faTimesCircle}
          size="2x"
          color="black"
        />
      );
    case "viewable":
      return (
        <FontAwesomeIcon
          className="viewable"
          icon={faEye}
          size="1x"
          color="#37383C"
        />
      );
    case "unviewable":
      return (
        <FontAwesomeIcon
          className="unviewable"
          icon={faEyeSlash}
          size="1x"
          color="#37383C"
        />
      );
    case "top":
      return (
        <FontAwesomeIcon
          className="top"
          icon={faCaretUp}
          size="2x"
          color="#37383C"
        />
      );
    case "delete":
      return (
        <FontAwesomeIcon
          className="delete"
          icon={faTrashAlt}
          size="1x"
          color="#37383C"
        />
      );
    case "circle-arrow-left":
      return (
        <svg
          width="45"
          height="45"
          viewBox="0 0 45 45"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M45 22.5C45 34.9264 34.9264 45 22.5 45C10.0736 45 0 34.9264 0 22.5C0 10.0736 10.0736 0 22.5 0C34.9264 0 45 10.0736 45 22.5Z"
            fill="#C7B198"
          />
          <path
            d="M45 22.5C45 34.9264 34.9264 45 22.5 45C10.0736 45 0 34.9264 0 22.5C0 10.0736 10.0736 0 22.5 0C34.9264 0 45 10.0736 45 22.5Z"
            fill="#C7B198"
          />
          <path
            d="M16.6857 21.9837L26.1754 12.1929C26.6329 11.7209 27.3751 11.7209 27.8326 12.1929L28.9396 13.335C29.3966 13.8066 29.3971 14.5703 28.9415 15.0429L21.4205 22.8386L28.941 30.6349C29.3971 31.1074 29.3961 31.8712 28.9391 32.3427L27.8321 33.4848C27.3746 33.9569 26.6324 33.9569 26.1749 33.4848L16.6857 23.6936C16.2281 23.2215 16.2281 22.4557 16.6857 21.9837Z"
            fill="white"
          />
        </svg>
      );
    case "circle-arrow-right":
      return (
        <svg
          width="45"
          height="45"
          viewBox="0 0 45 45"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M45 22.5C45 34.9264 34.9264 45 22.5 45C10.0736 45 0 34.9264 0 22.5C0 10.0736 10.0736 0 22.5 0C34.9264 0 45 10.0736 45 22.5Z"
            fill="#C7B198"
          />
          <path
            d="M45 22.5C45 34.9264 34.9264 45 22.5 45C10.0736 45 0 34.9264 0 22.5C0 10.0736 10.0736 0 22.5 0C34.9264 0 45 10.0736 45 22.5Z"
            fill="#C7B198"
          />
          <path
            d="M28.9393 23.3286L19.4498 32.818C18.9922 33.2756 18.2502 33.2756 17.7926 32.818L16.6858 31.7112C16.2289 31.2543 16.228 30.5138 16.6838 30.0558L24.2044 22.4999L16.6838 14.944C16.228 14.486 16.2289 13.7455 16.6858 13.2887L17.7926 12.1819C18.2502 11.7242 18.9922 11.7242 19.4498 12.1819L28.9392 21.6713C29.3969 22.1289 29.3969 22.8709 28.9393 23.3286Z"
            fill="white"
          />
        </svg>
      );
    case "order-detail-icon":
      return (
        <FontAwesomeIcon
          className="order-detail-icon"
          icon={faClipboardList}
          size="2x"
          color="#37383C"
        />
      );
    case "mail-open":
      return (
        <FontAwesomeIcon
          className="mail-open"
          icon={faEnvelopeOpen}
          size="3x"
          color="white"
        />
      );
    default:
      return null;
  }
};
