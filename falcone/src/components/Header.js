import "./Header.css";

const Header = ({ setReset }) => {
  return (
    <div className="header">
      <button type="button" onClick={setReset(1)}>
        Reset
      </button>
      <button type="button">
        <a className="header-anchor" href="https://www.geektrust.com/">
          Geektrust home
        </a>
      </button>
    </div>
  );
};

export default Header;
