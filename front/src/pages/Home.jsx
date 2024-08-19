import iconChat from "../assets/img/icon-chat.png";
import iconMoney from "../assets/img/icon-money.png";
import iconSecurity from "../assets/img/icon-security.png";
import Features from "../components/Features";
import Hero from "../components/Hero";

const features = [
  {
    title: "You are our #1 priority",
    icon: iconChat,
    alt: "Chat Icon",
    description:
      "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes",
  },
  {
    title: "More savings means higher rates",
    icon: iconMoney,
    alt: "Money Icon",
    description:
      "The more you save with us, the higher your interest rate will be!",
  },
  {
    title: "Security you can trust",
    icon: iconSecurity,
    alt: "Security Icon",
    description:
      "We use top of the line encryption to make sure your data and money is always safe.",
  },
];

function Home() {
  return (
    <main>
      <Hero />
      <Features items={features} />
    </main>
  );
}

export default Home;
