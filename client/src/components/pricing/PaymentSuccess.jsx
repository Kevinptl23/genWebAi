import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const credits = params.get("credits");

  useEffect(() => {
    const updateCredits = async () => {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
      await axios.post(`${API_URL}/api/user/add-credits`, {
        credits,
      });
    };

    updateCredits();
  }, []);

  return (
    <div className="h-screen flex items-center justify-center text-white bg-black">
      <h1 className="text-3xl">Payment Successful 🎉</h1>
    </div>
  );
};

export default PaymentSuccess;