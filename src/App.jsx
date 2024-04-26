import React, { useCallback, useState, useEffect, useRef } from 'react';

function App() {
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [length, setLength] = useState(10);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*())_+-+*/}{][~`";
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [numberAllowed, charAllowed, length]);

  useEffect(() => {
    passwordGenerator();
  }, [numberAllowed, charAllowed, length]);

  const refPassword = useRef(null);

  const copyButton = useCallback(() => {
    navigator.clipboard.writeText(password)
      .then(() => {
        alert("Text copied");
        setTimeout(() => {
          // Don't close the window programmatically
        }, 1000); // Close the alert after 1 second
      })
      .catch((error) => {
        console.error('Failed to copy text: ', error);
      });
  }, [password]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md text-center text-orange-500 
        px-4 py-5 my-5 bg-gray-500 rounded-md">
        <h1 className="text-white text-center my-4">Password Generator</h1>

        <div className="flex shadow rounded-lg mb-3 overflow-hidden">
          <input
            type="text"
            className="outline-none w-full px-3 py-1 rounded-lg"
            placeholder="password"
            value={password}
            ref={refPassword}
            readOnly
          />{' '}
          <button
            className="rounded-lg bg-cyan-600 px-3 py-0.5 text-white hover:text-black"
            onClick={copyButton}
          >
            copy
          </button>
        </div>
        <div className="flex gap-x-2">
          <div className="flex items-center gap-x-2">
            <input
              type="range"
              min={10}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="Ranage" className="text-white">
              length:{length}
            </label>
            <input
              type="checkbox"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
              defaultChecked={charAllowed}
              key="charAllowed"
            />{' '}
            <label htmlFor="Numbers" className="text-white">
              Numbers
            </label>
            <input
              type="checkbox"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
              defaultChecked={numberAllowed}
              key="numberAllowed"
            />{' '}
            <label htmlFor="Characters" className="text-white">
              Characters
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
