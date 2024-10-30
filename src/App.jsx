import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [num, setNum] = useState(false);
  const [spc, setSpc] = useState(false);
  const [len, setLen] = useState(8);
  const [Password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const PasswordGene = useCallback(() => {
    let alpha = "qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM";
    if (num) alpha = alpha + "1234567890";
    if (spc) alpha = alpha + "!@#$%^&*()-_=+[]{}|;:',.<>?/`~";
    let pass = "";
    for (let i = 0; i < len; i++) {
      let ind = Math.floor(Math.random() * alpha.length);
      pass += alpha[ind];
    }

    setPassword(pass);
    console.log(Password);
  }, [len, num, spc, setPassword]);

  const copyPass = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(Password);
  }, [Password]);

  function handleNum() {
    if (num) setNum(false);
    else setNum(true);
  }

  function handleSpc() {
    if (num) setSpc(false);
    else setSpc(true);
  }

  const handleLen = (event) => {
    setLen(event.target.value);
  };

  // function genePass() {
  //   let alpha= "qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM";
  //     if(num) alpha=alpha+"1234567890";
  //     if(spc) alpha= alpha+"!@#$%^&*()-_=+[]{}|;:',.<>?/`~";
  //     let pass="";
  //     for(let i=0;i<len;i++){
  //        let ind = Math.floor((Math.random())*(alpha.length));
  //        pass+=alpha[ind];
  //     }
  //      console.log(pass);
  // }
  useEffect(() => {
    PasswordGene();
  }, [len, num, spc, PasswordGene]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3">Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          ref={passwordRef}
          value={Password}
          className="outline-none w-full py-1 px-3"
          readOnly
          placeholder="password"
          name=""
          id=""
        />

        <button
          type="button"
          style={{ backgroundColor: "violet" }}
          onClick={copyPass}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
        >
          Copy
        </button>
      </div>

      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <label for="number">
            <input
              type="checkbox"
              checked={num}
              onChange={handleNum}
              id="number"
              className="cursor-pointer"
            />{" "}
            Numbers {num ? "include" : "not include"}
          </label>
        </div>

        <div className="flex items-center gap-x-1">
          <label for="special">
            <input
              type="checkbox"
              className="cursor-pointer"
              checked={spc}
              onChange={handleSpc}
              id="special"
            />{" "}
            Special Characters {spc ? "include" : "not include"}
          </label>
        </div>

        <div className="flex items-center gap-x-1">
          <label for="range">
            <input
              className="cursor-pointer"
              type="range"
              min="8"
              max="32"
              value={len}
              onChange={handleLen}
              id="range"
            />{" "}
            Length({len})
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
