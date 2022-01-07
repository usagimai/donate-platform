import ScrollTop from "../components/reusable/ScrollTop";
import Hero from "../components/hero/Hero";
import Main from "../components/main/Main";

const Home = ({ user, setLoginBoxOpen }) => {
  return (
    <>
      <Hero />
      <Main user={user} setLoginBoxOpen={setLoginBoxOpen} />
      <ScrollTop />
    </>
  );
};

export default Home;
