import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <>
      <h1>Oh no...!</h1>
      <p>The page is not found.</p>
      <Link to="/">Get the hell out of here!</Link>
    </>
  );
};

export default Missing;
