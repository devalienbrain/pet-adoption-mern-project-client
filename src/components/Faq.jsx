import { useState } from "react";

const Faq = () => {
  // State to manage which FAQ items are expanded
  const [expandedItems, setExpandedItems] = useState([]);

  // Function to toggle FAQ item expansion
  const toggleItem = (index) => {
    if (expandedItems.includes(index)) {
      setExpandedItems(expandedItems.filter((item) => item !== index));
    } else {
      setExpandedItems([...expandedItems, index]);
    }
  };

  return (
    <section>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-6xl font-black text-center mb-3 md:mb-6">
          Frequently Asked Questions
        </h1>
        <div className="space-y-4 md:space-y-6">
          {faqData.map((item, index) => (
            <div key={index} className="border rounded-lg p-4 md:p-6">
              <button
                className="flex justify-between items-center w-full p-2 md:p-4 focus:outline-none"
                onClick={() => toggleItem(index)}
              >
                <h2 className="text-lg md:text-xl font-semibold text-left">
                  {item.question}
                </h2>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-6 w-6 transition-transform ${
                    expandedItems.includes(index) ? "transform rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {expandedItems.includes(index) && (
                <p className="p-2 text-sm md:text-lg  md:p-4 text-left">
                  {item.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Data for FAQ items
const faqData = [
  {
    question: "How can I ensure that my donation reaches the animals in need?",
    answer:
      "We prioritize transparency and accountability. Rest assured, your donation directly supports animal welfare initiatives. We regularly update our donors on the impact of their contributions through newsletters and social media updates.",
  },
  {
    question:
      "Are the pets listed for adoption vaccinated and spayed/neutered?",
    answer:
      "Yes, we prioritize the health and well-being of our furry friends. All pets available for adoption are vaccinated, spayed/neutered, and undergo comprehensive health checks before being listed on our platform.",
  },
  {
    question: "Can I specify which animal my donation goes towards?",
    answer:
      "Absolutely! We understand that donors often have a special connection to particular animals. You can designate your donation to a specific pet or select a broader category such as medical care, food, or shelter improvements.",
  },
  {
    question:
      "How can I trust the legitimacy of the pets listed for adoption on PawPlace?",
    answer:
      "PawPlace partners with reputable animal rescue organizations and shelters to ensure the legitimacy and welfare of every pet listed on our platform. Additionally, we conduct thorough background checks and verification processes to maintain the highest standards of animal care and adoption ethics.",
  },
  {
    question:
      "What happens if I'm interested in adopting a pet but live far away?",
    answer:
      "PawPlace partners with reputable animal rescue organizations and shelters to ensure the legitimacy and welfare of every pet listed on our platform. Additionally, we conduct thorough background checks and verification processes to maintain the highest standards of animal care and adoption ethics.",
  },
];

export default Faq;
