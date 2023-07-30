import Header from "./Header";
import Footer from "./Footer";
import { useState, useEffect } from "react";

const Result = ({ planetFound, totalTime, setReset }) => {
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    if (planetFound) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  }, [planetFound]);
  return (
    <div>
      <Header setReset={setReset} />
      <h1>Finding Falcone!</h1>
      {success && (
        <div>
          <h3>
            Success! Congratulations on Finding Falcone. King Shan is mighty
            pleased
          </h3>
          <h3>Time taken:{totalTime}</h3>
          <h3>Planet found:{planetFound}</h3>
        </div>
      )}
      {!success && (
        <div>
          <h3>Failure! Falcone escaped. King Shan is not pleased</h3>
          <h3>Time taken:{totalTime}</h3>
        </div>
      )}
      <button
        onClick={() => {
          setReset(1);
        }}
      >
        Start Again
      </button>
      <Footer />
    </div>
  );
};

export default Result;
