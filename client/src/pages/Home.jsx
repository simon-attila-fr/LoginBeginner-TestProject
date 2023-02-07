import useAuth from "../components/hooks/useAuth";
import { Link } from "react-router-dom";

const Home = () => {
  const { auth } = useAuth();

  return (
    <>
      <h1>Home</h1>
      <p>{`Welcome ${auth.username}, you are logged in!`}</p>
      <Link to="admin">Admin Page</Link>
      <br />
      <Link to="user">User Page</Link>
    </>
  );
};

export default Home;
