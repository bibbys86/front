import React from "react";
import { useNavigate } from "react-router-dom";

function Cart({ cart, remove }) {
  const navigate = useNavigate();
  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div>
      <h2>🛒 장바구니</h2>
      <ul>
        {cart.map(i => (
          <li key={i.id}>
            {i.model} x {i.quantity} = {i.price * i.quantity} 원
            <button onClick={() => remove(i.id)}>삭제</button>
          </li>
        ))}
      </ul>
      <p>총 합계: {total.toLocaleString()} 원</p>
      <button onClick={() => navigate("/checkout")}>결제하기</button>
    </div>
  );
}
export default Cart;
