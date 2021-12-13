import React from "react";
import Cart from "./Components/Cart";
import Filter from "./Components/Filter";
import Products from "./Components/Products";
import data from "./data.json";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
      products: data.products,
      size: "",
      sort: "",
    };
    this.sortProducts = this.sortProducts.bind(this);
    this.filterProducts = this.filterProducts.bind(this);
  }

  createOrder = (order) => {
    alert(`Need to save order for :  ${order.name}`);
  };

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.filter((item) => {
      return item._id !== product._id;
    });
    this.setState({ cartItems });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };
  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();

    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    this.setState({ cartItems });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  sortProducts(event) {
    const sort = event.target.value;
    this.setState((state) => ({
      sort: sort,
      products: this.state.products.slice().sort((a, b) => {
        return sort === "lowest"
          ? a.price > b.price
            ? 1
            : -1
          : sort === "highest"
          ? a.price < b.price
            ? 1
            : -1
          : a._id > b._id
          ? 1
          : -1;
      }),
    }));
  }

  filterProducts(event) {
    console.log(event.target.value);
    if (event.target.value === "") {
      this.setState({ size: event.target.value, products: data.products });
    } else {
      this.setState({
        size: event.target.value,
        products: data.products.filter(
          (product) => product.availableSizes.indexOf(event.target.value) >= 0
        ),
      });
    }
  }

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              />
              <Products
                products={this.state.products}
                addToCart={this.addToCart}
              />
            </div>
            <div className="sidebar">
              <Cart
                cartItems={this.state.cartItems}
                removeFromCart={this.removeFromCart}
                createOrder={this.createOrder}
              />
            </div>
          </div>
        </main>
        <footer>All right is reserved</footer>
      </div>
    );
  }
}

export default App;
