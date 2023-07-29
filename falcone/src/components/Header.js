import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <button type="button">Reset</button>
      <button type="button">
        <a className="header-anchor" href="https://www.geektrust.com/">
          Geektrust home
        </a>
      </button>
    </div>
  );
};

export default Header;
