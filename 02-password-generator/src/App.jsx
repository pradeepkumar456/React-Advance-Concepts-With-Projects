import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // Use Ref to store the password generator function
  const passwordRef = useRef(null);


  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+";

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed , setPassword]);

  const handleCopyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  },[password]);

  // UseEffect to generate password on dependency change
  useEffect(()=>{
    passwordGenerator();
  },[length, numberAllowed, charAllowed , passwordGenerator])
  return (
    <div className="w-full max-w-lg mx-auto shadow-md rounded-lg px-4 my-12 text-orange-400 text-2xl  bg-gray-700 py-6">
      <h1 className="text-center text-white ">Password Generator</h1>
      <div className="flex shadow overflow-hidden rounded-lg mt-6">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3 m-2 bg-gray-300 text-red-500 rounded-lg "
          placeholder="password"
          readOnly
          ref={passwordRef}
        />
        <button onClick={handleCopyPassword} className="bg-blue-500  text-white px-3  rounded-lg cursor-pointer shrink-0 hover:bg-blue-700">
          Copy
        </button>
      </div>

      <div className="flex text-sm gap-x-4 mt-3">
        <div className="flex items-center gap-x-2">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
          />
          <label>Length : {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={(e) => setNumberAllowed((prev) => !prev)}
          />
          <label id="numberInput">Numbers </label>
        </div>
         <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="charInput"
            onChange={(e) => setCharAllowed((prev) => !prev)}
          />
          <label id="charInput">Characters </label>
        </div>
      </div>
    </div>
  );
}

export default App;
