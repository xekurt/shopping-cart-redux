import React, { Component } from "react";

export default class Cart extends Component {
  render() {
    const { cartItems } = this.props;
    return (
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header">cart is empty</div>
        ) : (
          <div className="cart cart-header">
            You have {cartItems.length} in the cart
          </div>
        )}
        <div className="cart">
          <ul className="cart-items">
            {cartItems.map((item) => {
              return (
                <li key={item._id}>
                  <div>
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div>
                    <div>{item.title}</div>
                    <div className="right">
                      <b>
                        {" "}
                        ${item.price} x {item.count}{" "}
                      </b>
                      <button
                        className="button"
                        onClick={() => {
                          this.props.removeFromCart(item);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        {cartItems.length !== 0 && (
          <div className="cart">
            <div className="total">
              <div>
                Total is : $
                {cartItems.reduce((a, c) => a + c.price * c.count, 0)}
              </div>
              <div className="button primary">Proceed</div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
