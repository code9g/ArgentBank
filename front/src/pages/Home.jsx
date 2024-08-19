import iconChat from "../assets/img/icon-chat.png";
import iconMoney from "../assets/img/icon-money.png";
import iconSecurity from "../assets/img/icon-security.png";
import Feature from "../components/Feature";

function Home() {
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
  return (
    <main>
      <div className="hero">
        <section className="hero-content">
          <h2 className="sr-only">Promoted Content</h2>
          <p className="subtitle">No fees.</p>
          <p className="subtitle">No minimum deposit.</p>
          <p className="subtitle">High interest rates.</p>
          <p className="text">Open a savings account with Argent Bank today!</p>
        </section>
      </div>
      <section className="features">
        <h2 className="sr-only">Features</h2>
        {features.map((feature, index) => (
          <Feature key={index} {...feature} />
        ))}
      </section>
    </main>
  );
}

export default Home;
