import iconChat from "../assets/img/icon-chat.png";
import iconMoney from "../assets/img/icon-money.png";
import iconSecurity from "../assets/img/icon-security.png";

export const features = [
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

export const accounts = [
  {
    id: 1,
    title: "Argent Bank Checking",
    operations: 8_349,
    amount: 2_082.79,
    description: "Available Balance",
  },
  {
    id: 2,
    title: "Argent Bank Savings",
    operations: 6_712,
    amount: 10_928.42,
    description: "Available Balance",
  },
  {
    id: 3,
    title: "Argent Bank Credit Card",
    operations: 8_349,
    amount: 184.3,
    description: "Current Balance",
  },
];
