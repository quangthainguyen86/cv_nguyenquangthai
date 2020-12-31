import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

import { Container } from "reactstrap";

import AppNavbar from "./components/AppNavBar";
import ShoppingList from "./components/ShoppingList";
import ItemModal from "./components/ItemModal";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
           <ItemModal />
             <div class="mainDetails">
                  <div id="headshot" class="quickFade">
                      <img src="https://i.imgur.com/Fppp76E.png" alt="quangthai"/>
                  </div>
                  <div id="name">
                      <h3 class="quickFade delayThree">Quang Thai Nguyen</h3>
                      <h6 class="quickFade delayThree"> Phu Xuan, Phu Vang, Thua Thien Hue province</h6>
                      <h6 class="quickFade delayThree"> (+84) 359 82 8822</h6>
                      <h6 class="quickFade delayThree"> quangthainguyen8698@gmail.com</h6>
                  </div>
                  <div class="clear"></div>
              </div>
            <ShoppingList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
