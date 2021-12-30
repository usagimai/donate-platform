import Hero from "../components/hero/Hero";
import Main from "../components/main/Main";

const Home = ({ user, setLoginBoxOpen }) => {
  return (
    <>
      <Hero />
      <Main user={user} setLoginBoxOpen={setLoginBoxOpen} />
    </>
  );
};

export default Home;
