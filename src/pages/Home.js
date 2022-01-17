import Hero from "../components/hero/Hero";
import Main from "../components/main/Main";

const Home = ({ setLoginBoxOpen }) => {
  return (
    <>
      <Hero />
      <Main setLoginBoxOpen={setLoginBoxOpen} />
    </>
  );
};

export default Home;
