import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { BASE_URL } from "../utils/constant";

const Premium = () => {
  const handleBuyClick = async (type) => {
    const { data } = await axios.post(
      BASE_URL + "/payment/create",
      { membershipType: type },
      { withCredentials: true }
    );

    const { amount, keyId, currency, notes, orderId } = data;

    const options = {
      key: keyId,
      amount,
      currency,
      name: "Finding Dev",
      description: "Connect to other Developer",
      order_id: orderId,
      prefill: {
        name: notes.name,
        email: notes.emailId,
      },
      theme: { color: "#F37254" },
    };

    new window.Razorpay(options).open();
  };

  const plans = [
    {
      title: "Silver Membership",
      price: "₹499",
      duration: "3 Months",
      type: "silver",
      highlight: false,
      features: [
        "Chat with other people",
        "100 Connection Requests per day",
        "Blue Tick",
        "3 Months Access",
      ],
    },
    {
      title: "Gold Membership",
      price: "₹899",
      duration: "6 Months",
      type: "gold",
      highlight: true,
      features: [
        "Chat with other people",
        "Unlimited Connection Requests",
        "Blue Tick",
        "6 Months Access",
      ],
    },
  ];

  const PlanCard = ({ plan, idx }) => {
    const baseClasses =
      "relative rounded-2xl shadow-lg p-8 flex flex-col justify-between";
    const styles = plan.highlight
      ? "bg-gray-900 border border-yellow-500"
      : "bg-gray-800 border border-gray-600";
    const buttonStyle = plan.highlight ? "btn-primary" : "btn-outline btn-secondary";

    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: idx * 0.2 }}
        className={`${baseClasses} ${styles}`}
      >
        {plan.highlight && (
          <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-black text-sm font-semibold px-4 py-1 rounded-full shadow-md">
            Most Popular
          </span>
        )}

        <div>
          <h2 className="text-2xl font-bold mb-2">{plan.title}</h2>
          <p className="text-5xl font-extrabold mb-1">{plan.price}</p>
          <p className="text-gray-400 font-medium mb-6">{plan.duration}</p>
          <ul className="space-y-3 text-lg">
            {plan.features.map((f, i) => (
              <li key={i} className="flex items-center gap-2">
                <CheckCircle className="text-green-400 w-5 h-5" /> {f}
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={() => handleBuyClick(plan.type)}
          className={`mt-8 w-full btn ${buttonStyle} rounded-xl text-lg`}
        >
          Buy {plan.title.split(" ")[0]}
        </button>
      </motion.div>
    );
  };

  return (
    <div className="flex flex-col items-center p-10 bg-[#0f172a] min-h-[90vh] text-white">
      <h1 className="text-4xl font-extrabold mb-4">Upgrade to Premium</h1>
      <p className="text-gray-400 mb-12 text-lg text-center max-w-2xl"></p>

      <div className="grid md:grid-cols-2 gap-10 w-full max-w-5xl">
        {plans.map((plan, idx) => (
          <PlanCard key={idx} plan={plan} idx={idx} />
        ))}
      </div>
    </div>
  );
};

export default Premium;
