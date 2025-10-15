import LogoWhite from "../assets/logo-white.svg";
import LogoDark from "../assets/logo-dark.svg";

function Logo({ dark = false }) {
  return <img src={dark ? LogoWhite : LogoDark} alt="Logo" />;
}

export default Logo;
