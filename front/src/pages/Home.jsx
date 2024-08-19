import Features from "../components/Features";
import Hero from "../components/Hero";
import { features } from "../utils/consts";

function Home() {
  return (
    <main>
      <Hero />
      <Features items={features} />
    </main>
  );
}

export default Home;
