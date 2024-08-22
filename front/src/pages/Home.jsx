import Features from "../components/Features";
import Hero from "../components/Hero";
import Title from "../components/Title";
import { features } from "../utils/consts";

function Home() {
  return (
    <>
      <Title>Home</Title>
      <main>
        <Hero />
        <Features items={features} />
      </main>
    </>
  );
}

export default Home;
