import { supabase } from "../supabaseClient";

export async function startPayment(applicant: any) {
  const options = {
    key: "YOUR_RAZORPAY_KEY_ID", // replace with your Razorpay key_id
    amount: applicant.amount * 100, // amount in paisa
    currency: "INR",
    name: "ZenTech Innovators",
    description: "Internship Registration Fee",
    image: "/logo.png",
    handler: async function (response: any) {
      console.log("Payment success:", response);

      // Save payment details to Supabase
      const { error } = await supabase.from("payments").insert([
        {
          intern_id: applicant.id,
          payment_id: response.razorpay_payment_id,
          order_id: response.razorpay_order_id,
          signature: response.razorpay_signature,
          amount: applicant.amount,
          status: "success",
          method: "Razorpay",
        },
      ]);

      if (error) {
        console.error("Supabase save error:", error.message);
        alert("Payment successful, but database save failed!");
      } else {
        alert("Payment successful and saved!");
      }
    },
    prefill: {
      name: applicant.name,
      email: applicant.email,
      contact: applicant.phone,
    },
    theme: {
      color: "#6B00B6",
    },
  };

  const paymentObject = new (window as any).Razorpay(options);
  paymentObject.open();
}
