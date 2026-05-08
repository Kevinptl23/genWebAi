// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export const createCheckoutSession = async (req, res) => {
//   try {
//     const { plan } = req.body;

//     let price = 0;
//     let credits = 0;

//     if (plan === "Pro") {
//       price = 499;
//       credits = 500;
//     } else if (plan === "Enterprise") {
//       price = 1499;
//       credits = 1000;
//     }
//     console.log("this is key", process.env.STRIPE_SECRET_KEY);

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",
//       line_items: [
//         {
//           price_data: {
//             currency: "inr",
//             product_data: {
//               name: `${plan} Plan`,
//             },
//             unit_amount: price * 100,
//           },
//           quantity: 1,
//         },
//       ],
//       success_url: `${process.env.CLIENT_URL}/payment-success?credits=${credits}`,
//       cancel_url: `${process.env.CLIENT_URL}/pricing`,
//     });

//     res.json({
//       id: session.id,
//       url: session.url,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Payment failed" });
//   }
// };