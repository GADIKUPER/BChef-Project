import React from "react";
import Navigation from "./Navigation/Navigate";
import NavigationAdmin from "./Navigation/NavigateAdmin";
import { BchefProvider } from "./Components/BchefContext";
export default function App() {

  return (

    <BchefProvider>
      <Navigation />
    </BchefProvider>

  );

}
