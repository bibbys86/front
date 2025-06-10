import React from "react";
import { useNavigate } from "react-router-dom";

function Checkout({ cart }) {
  const navigate = useNavigate();

  return (
    <div>
      <h2>💳 결제 확인</h2>
      <ul>
        {cart.map(i => (
          <li key={i.id}>{i.model} x {i.quantity}</li>
        ))}
      </ul>
      <button onClick={() => navigate("/success")}>✅ 결제 완료</button>
    </div>
  );
}
export default Checkout;
