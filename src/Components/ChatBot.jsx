// import React, { useState ,useEffect,useRef} from "react";
// import Loader from "./Loader";

// const ChatBot = ({ genRes }) => {
//   const [input, setInput] = useState("");
//   const [conversation, setConversation] = useState([]);
//   const chatContainerRef = useRef(null);
//   const handleSendMessage = async () => {
//     if (!input) return;
//     console.log("intput", input);

//     const newConversation = [
//       ...conversation,
//       { question: input, response: "Loading..." },
//     ];
//     setConversation(newConversation);
//     console.log("new consversation ", newConversation);

//     const aiResponse = await genRes(input);
//     console.log("ai,response", aiResponse);

//     const updatedConversation = [...newConversation];
//     updatedConversation[updatedConversation.length - 1].response = aiResponse;
//     setConversation(updatedConversation);
//     console.log("after ai responsde updated conversation", updatedConversation);

//     setInput("");

//     // console.log()
//   };

//  useEffect(() => {
//    // Scroll to bottom whenever conversation updates
//    if (chatContainerRef.current) {
//      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//    }
//  }, [conversation]);
//  const formatResponse = (response) => {
//    response = response.replace(
//      /##(.*?)\n/g,
//      `<p class='text-3xl font-["Crossed"] font-extrabold mb-2' style='color:#1D1D1B'>$1</p>`
//    );

//    response = response.replace(
//      /\*\*(.*?)\*\*/g,
//      `<h1 class='font-["Crossed"] text-lg font-bold mt-4' style='color:#333333'>$1</h1>`
//    );

//    response = response.replace(
//      /^\*(.*?)$/gm,
//      `<p class='text-sm font-thin ml-4' style='color:#555555'>$1</p>`
//    );

//    response = response.replace(
//      /\*(.*?)\n/g,
//      `<p class='text-sm font-thin ml-4' style='color:#555555'>$1</p>`
//    );

//    response = response.replace(
//      /```javascript(.*?)```/gs,
//      `<div class='mt-4'><pre class='p-4 bg-gray-900 rounded-lg'><code class='language-javascript'>$1</code></pre></div>`
//    );

//    return response;
//  };

//   return (
//     <div className="w-full sm:text-xs text-xl h-full relative">
//       {/* consversation   things */}
//       <div
//         ref={chatContainerRef}
//         className="flex-1 overflow-y-auto space-y-4 p-4 max-h-[calc(100vh-100px)]"
//       >
//         {conversation.map((data, index) => {
//           return (
//             <div key={index} className="space-y-5 ">
//               {/* user q come here */}
//               <div className="text-right">
//                 <div className="w-fit text-lg text-white bg-[#232321]  justify-self-end flex justify-center text-center items-center border-2 border-transparent pt-2  px-2 py-1 rounded-lg">
//                   <p>{data.question}</p>
//                 </div>
//               </div>
//               {/* ai response */}
//               <div className="flex items-start">
//                 {data.response === "Loading..." ? (
//                   <Loader />
//                 ) : (
//                   <div
//                     className="inline-block max-w-[80%] font-['pp'] text-lg border-2 border-[#1D1D1B] px-4 py-2 rounded-lg"
//                     dangerouslySetInnerHTML={{
//                       __html: formatResponse(data.response),
//                     }}
//                   />
//                 )}
//               </div>{" "}
//             </div>
//           );
//         })}
//       </div>
//       {/* input section!!!! */}

//       <div className="w-full  p-4 md:mt-10  sm:mt-48 sm:gap-5 absolute bottom-3 flex items-center justify-around">
//         <input
//           rows="1"
//           className="w-[85%] outline-none p-2 bg-transparent border-b-2 border-[#1D1D1B]  placeholder:text-[#47474760]"
//           placeholder="Ask a question..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === "Enter" && input.trim()) {
//               handleSendMessage();
//             }
//           }}
//         />
//         <button
//           onClick={handleSendMessage}
//           className="px-4 py-2 pt-3   bg-[#e0b359] rounded-lg"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatBot;


import React, { useState, useEffect, useRef } from "react";
import Loader from "./Loader";

const ChatBot = ({ genRes }) => {
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState([]);
  const chatContainerRef = useRef(null);

  const handleSendMessage = async () => {
    if (!input) return;
    const newConversation = [
      ...conversation,
      { question: input, response: "Loading..." },
    ];
    setConversation(newConversation);
    const aiResponse = await genRes(input);
    const updatedConversation = [...newConversation];
    updatedConversation[updatedConversation.length - 1].response = aiResponse;
    setConversation(updatedConversation);
    setInput("");
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [conversation]);

  // const formatResponse = (response) => {
  //   response = response.replace(
  //     /##(.*?)\n/g,
  //     `<p class='text-3xl font-bold mb-2'>$1</p>`
  //   );
  //   response = response.replace(
  //     /\*\*(.*?)\*\*/g,
  //     `<h1 class='text-lg font-bold mt-4'>$1</h1>`
  //   );
  //   response = response.replace(
  //     /^\*(.*?)$/gm,
  //     `<p class='text-sm font-thin ml-4'>$1</p>`
  //   );
  //   response = response.replace(
  //     /\*(.*?)\n/g,
  //     `<p class='text-sm font-thin ml-4'>$1</p>`
  //   );

  //   // Multi-line code blocks (handling all languages dynamically)
  //   response = response.replace(
  //     /```(\w+)\n([\s\S]*?)```/g,
  //     `<div class='mt-4'>
  //     <pre class='p-4 bg-gray-900 text-gray-200 rounded-lg overflow-auto'>
  //       <code class='language-$1'>$2</code>
  //     </pre>
  //   </div>`
  //   );

  //   // Inline code
  //   response = response.replace(
  //     /`([^`]+)`/g,
  //     `<code class='bg-gray-800 text-yellow-300 px-1 py-0.5 rounded'>$1</code>`
  //   );

  //   return response;
  // };

const formatResponse = (response) => {
  response = response.replace(
    /##(.*?)\n/g,
    `<p class='text-3xl font-bold mb-2'>$1</p>`
  );
  response = response.replace(
    /\*\*(.*?)\*\*/g,
    `<h1 class='text-lg font-bold mt-4'>$1</h1>`
  );
  response = response.replace(
    /^\*(.*?)$/gm,
    `<p class='text-sm font-thin ml-4'>$1</p>`
  );
  response = response.replace(
    /\*(.*?)\n/g,
    `<p class='text-sm font-thin ml-4'>$1</p>`
  );

  // Multi-line code blocks (Python, JavaScript, C++)
  response = response.replace(
    /```python(.*?)```/gs,
    `<div class='mt-4'>
      <pre class='p-4 bg-gray-900 text-green-400 rounded-lg overflow-auto'>
        <code class='language-python'>$1</code>
      </pre>
    </div>`
  );

  response = response.replace(
    /```javascript(.*?)```/gs,
    `<div class='mt-4'>
      <pre class='p-4 bg-gray-900 text-blue-400 rounded-lg overflow-auto'>
        <code class='language-javascript'>$1</code>
      </pre>
    </div>`
  );

  response = response.replace(
    /```cpp(.*?)```/gs,
    `<div class='mt-4'>
      <pre class='p-4 bg-gray-900 text-purple-400 rounded-lg overflow-auto'>
        <code class='language-cpp'>$1</code>
      </pre>
    </div>`
  );

  // Generic code block (for other languages)
  response = response.replace(
    /```(\w+)\n([\s\S]*?)```/g,
    `<div class='mt-4'>
      <pre class='p-4 bg-gray-900 text-gray-300 rounded-lg overflow-auto'>
        <code class='language-$1'>$2</code>
      </pre>
    </div>`
  );

  // Inline code
  response = response.replace(
    /`([^`]+)`/g,
    `<code class='bg-gray-800 text-yellow-300 px-1 py-0.5 rounded'>$1</code>`
  );

  return response;
};




  return (
    <div className="w-full h-full flex flex-col p-2 sm:p-4 md:p-6 overflow-hidden">
      {/* Conversation Area */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto space-y-4 p-2 sm:p-4 pb-16 sm:pb-20"
      >
        {conversation.map((data, index) => (
          <div key={index} className="space-y-3 sm:space-y-4">
            {/* User Question */}
            <div className="flex justify-end">
              <div className="max-w-[80%] sm:max-w-[70%] bg-[#232321] text-white rounded-lg px-2 py-1 sm:px-3 sm:py-2 text-sm sm:text-base md:text-lg">
                <p>{data.question}</p>
              </div>
            </div>
            {/* AI Response */}
            <div className="flex items-start">
              {data.response === "Loading..." ? (
                <Loader />
              ) : (
                <div
                  className="max-w-[80%] sm:max-w-[70%] font-['pp'] text-sm sm:text-base md:text-lg border-2 border-[#1D1D1B] px-2 py-1 sm:px-4 sm:py-3 rounded-lg"
                  dangerouslySetInnerHTML={{
                    __html: formatResponse(data.response),
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Input Section */}
      <div className="fixed bottom-0 left-0 right-0 p-2 sm:p-4 ">
        <div className="max-w-4xl mx-auto flex items-center gap-2 sm:gap-4">
          <input
            className="flex-1 outline-none p-2 bg-transparent border-b-2 border-[#1D1D1B] placeholder:text-[#47474760] text-sm sm:text-base"
            placeholder="Ask a question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && input.trim()) handleSendMessage();
            }}
          />
          <button
            onClick={handleSendMessage}
            className="px-3 py-2 sm:px-4 sm:py-2 bg-[#e0b359] rounded-lg text-sm sm:text-base font-medium hover:bg-[#d4a44d] transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;