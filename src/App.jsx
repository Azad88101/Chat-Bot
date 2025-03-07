import React from "react";
import NavBar from "./Components/NavBar";
import { generateRes } from "./Services/ApiService";
import ChatBot from "./Components/ChatBot";

const App = () => {
  return (
    <div className="bg-[#D8D3C0]">
      <div className=" h-screen flex flex-col  max-w-[1080px] mx-auto px-2 justify-start  items-center">
        <NavBar />

        <ChatBot genRes={generateRes} />
      </div>
    </div>
  );
};

export default App;
