import { useNavigate } from "react-router-dom";
import exitLogo from "../../Assets/Images/exit_logo.svg";
import { removeItem } from "../../Utils/storage";
import "./styles.css";

function Header() {
  const navigate = useNavigate();

  function handleExit() {
    removeItem("token");
    removeItem("userId");

    navigate("/");
  }

  return (
    <div className="header">
      <h1>KONTACTS</h1>
      <img
        onClick={() => handleExit()}
        className="header-img"
        src={exitLogo}
        alt="exit logo"
      />
    </div>
  );
}

export default Header;
