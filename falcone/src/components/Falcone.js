import Header from "./Header";
import Footer from "./Footer";

const Falcone = () => {
  return (
    <div className="falcone">
      <Header />
      <h1>Finding Falcone!</h1>
      <h3>Select planets you want to search in:</h3>
      <button>Find Falcone!</button>
      <Footer />
    </div>
  );
};

export default Falcone;
