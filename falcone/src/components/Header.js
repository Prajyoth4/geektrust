import "./Header.css";

const Header = ({ setReset }) => {
  const handleClick = () => {
    console.log("handle click reset button");
    setReset(1);
  };
  return (
    <div className="header">
      <button
        type="button"
        onClick={() => {
          handleClick();
        }}
      >
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
