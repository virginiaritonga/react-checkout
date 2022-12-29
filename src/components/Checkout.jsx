import React, { useState, useEffect } from "react";
import "../styles/Checkout.css";

function Checkout() {
  const [data, setData] = useState(null);
  const [setTermsAccepted] = useState(false);

  function handleTermsChange(event) {
    setTermsAccepted(event.target.checked);
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://6398216bfe03352a94c5a9f4.mockapi.io/api/v1/checkout/1"
      );
      const data = await response.json();
      setData(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      {data ? (
        <>
          <div className="wrapper">
            <div className="information">
              <div className="container delivery">
                <p>Delivery</p>
                <p>
                  {data.delivery} - {data.deliveryFee}
                </p>
                <p>Tickets available by {data.deliveryDate}</p>
                <p>
                  These mobile tickets will be transfered directly to you from a
                  trusted seller. We'll email your instructions on how to accept
                  them on the original ticket provider's mobile app.
                </p>
              </div>
              <div className="container payment">
                <div>
                  <input type="radio" value="Visa" name="cardInfo" />
                  <p>Visa - {data.creditCardNumber}</p>
                  <p>
                    {data.creditCardName} | exp. {data.creditCardExpiration}
                  </p>
                  <span>Edit | Delete</span>
                  <p>Security Code</p>
                  <input type="password" name="password" />
                  <p>3-digits on back of card</p>
                </div>
                <div>Add New Card</div>
                <div>
                  <p>Or Pay With</p>
                  <div>
                    By using a digital wallet and continuing past this page, you
                    have read and are accepting the{" "}
                    <a href={data.termsOfUse}>Terms of Use</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="container total">
              <div>
                <p>
                  Total{" "}
                  {data.price * data.quantity +
                    data.serviceFee * data.quantity +
                    data.orderingFee}{" "}
                </p>
              </div>
              <p>Tickets</p>
              <div>
                Resale Tickets: {data.price} x {data.quantity}
                <p>{data.price * data.quantity}</p>
              </div>
              <p>Notes from Seller</p>
              <p>{data.sellerNotes}</p>
              <p>Fees</p>
              <div>
                Service Fee: {data.serviceFee} x {data.quantity}
                <p>{data.serviceFee * data.quantity}</p>
              </div>
              <div>
                <p>Order Processing Fee:</p>
                <p>{data.orderingFee}</p>
              </div>
              <p>Delivery</p>
              <div>
                <p>{data.delivery}</p>
                <p>{data.deliveryFee}</p>
              </div>
              <div>Cancel Order</div>
              <div>*All Sales Final - No Refunds</div>

              <form>
                <input
                  type="checkbox"
                  name="terms"
                  onChange={handleTermsChange}
                  required
                />
                <label htmlFor="terms">
                  I have read and agree to the current{" "}
                  <a href={data.termsOfUse}>Terms of Use</a>
                </label>
                <button type="submit">Place Order</button>
              </form>
            </div>
          </div>
        </>
      ) : (
        <div>Loading data...</div>
      )}
    </div>
  );
}

export default Checkout;
