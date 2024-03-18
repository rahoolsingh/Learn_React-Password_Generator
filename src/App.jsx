import { useState, useCallback, useRef, useEffect } from "react";
import "./App.css";

function App() {
    const [length, setLength] = useState(8);
    const [numAllowed, setNumAllowed] = useState(false);
    const [specialCharAllowed, setSpecialCharAllowed] = useState(false);
    const [password, setPassword] = useState("");
    const [copyBtnLabel, setCopyBtnLabel] = useState("Copy")

    // useRef Hook
    const passwordRef = useRef(null);

    const passwordGenerator = useCallback(() => {
        let pass = "";
        let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";
        if (numAllowed) str += "0123456789";
        if (specialCharAllowed) str += "!@#$%^&*()_+-=[];',./?><{}:";

        for (let i = 1; i <= length; i++) {
            let char = Math.floor(Math.random() * str.length + 1);
            pass += str.charAt(char);
        }

        setPassword(pass);
    }, [length, numAllowed, specialCharAllowed, setPassword]);

    const copyPasswordToClipboard = useCallback(() => {
        passwordRef.current?.select();
        window.navigator.clipboard.writeText(passwordRef.current.value);
        setCopyBtnLabel("Copied")
        setTimeout(() => {
          setCopyBtnLabel("Copy")
        }, 1500);
    }, [passwordRef, password]);

    useEffect(() => {
        passwordGenerator();
    }, [length, numAllowed, specialCharAllowed]);

    return (
        <div className="h-screen flex items-center full">
            <div className="w-full sm:max-w-xl max-w-[80%] mx-auto rounded-lg px-8 py-2 my-8 backdrop-blur shadow-md bg-black bg-opacity-50">
                <h1 className="text-2xl my-3 text-center text-white">
                    Password Generator
                </h1>
                <div className="flex ">
                    <input
                        type="text"
                        value={password}
                        className="outline-none px-3 py-1 w-full rounded-l-lg text-green-700 font-medium"
                        placeholder="Password"
                        ref={passwordRef}
                        readOnly
                    />
                    <button
                        type="button"
                        className="px-4 py-2 bg-green-700 text-white rounded-r-lg"
                        onClick={copyPasswordToClipboard}
                    >
                        {copyBtnLabel}
                    </button>
                </div>
                <div className="flex flex-col sm:flex-row text-sm gap-x-2 my-4">
                    <span className="space-x-2 ms-4">
                        <input
                            type="range"
                            min={6}
                            max={50}
                            value={length}
                            className="cursor-pointer"
                            onChange={(e) => {
                                setLength(e.target.value);
                            }}
                        />
                        <label>Length: {length}</label>
                    </span>
                    <span className="space-x-2 ms-4">
                        <input
                            type="checkbox"
                            defaultChecked={numAllowed}
                            onChange={() => {
                                setNumAllowed((prev) => !prev);
                            }}
                        />
                        <label>Numbers</label>
                    </span>
                    <span className="space-x-2 ms-4">
                        <input
                            type="checkbox"
                            defaultChecked={specialCharAllowed}
                            onChange={() => {
                                setSpecialCharAllowed((prev) => !prev);
                            }}
                        />
                        <label>Special Characters</label>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default App;
