import { useState } from 'react'
import './App.css'


const buttonStyle = {
    padding: "10px 15px",
    backgroundColor: "#f39c12",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.2s ease-in-out",
};

const copyButtonStyle = {
    marginLeft: "10px",
    color:"white"
};
const App = () => {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(12);
  const [useSymbols, setUseSymbols] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useLowerCase, setUseLowerCase] = useState(true);
  const [useUpperCase, setUseUpperCase] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  const generatePassword = () => {
      let charset = "";
      let newPassword = "";

      if (useSymbols) charset += "!@#$%^&*()";
      if (useNumbers) charset += "0123456789";
      if (useLowerCase) charset += "abcdefghijklmnopqrstuvwxyz";
      if (useUpperCase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

      for (let i = 0; i < passwordLength; i++) {
          newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
      }

      setPassword(newPassword);
  };

  const copyToClipboard = () => {
      const el = document.createElement("textarea");
      el.value = password;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setSuccessMessage("Password copied to clipboard!");
      setTimeout(() => setSuccessMessage(""), 2000);
      // Hide message after 2 seconds
  };

  return (
      <div className='containerStyle'>
        <div  className='heading' >  <h3>Random Password Generator</h3></div> 
          <div className='inputContainerStyle'>
            <div className='labelStyle'> <label>Password Length:</label> </div>  
              <input
                  type="number"
                  min="8"
                  max="32"
                  value={passwordLength}
                  onChange={(e) => setPasswordLength(e.target.value)}
                  className='inputStyle'
              />
          </div>
          <div className='checkboxContainerStyle'>
              <label>
                  <input
                      type="checkbox"
                      checked={useSymbols}
                      onChange={() => setUseSymbols(!useSymbols)}
                  />
                  Symbols
              </label>
              <label>
                  <input
                      type="checkbox"
                      checked={useNumbers}
                      onChange={() => setUseNumbers(!useNumbers)}
                  />
                  Numbers
              </label>
              <label>
                  <input
                      type="checkbox"
                      checked={useLowerCase}
                      onChange={() => setUseLowerCase(!useLowerCase)}
                  />
                  LowerCase
              </label>
              <label>
                  <input
                      type="checkbox"
                      checked={useUpperCase}
                      onChange={() => setUseUpperCase(!useUpperCase)}
                  />
                  UpperCase
              </label>
          </div>
          <button className='buttonStyle' onClick={generatePassword}>
              Generate Password
          </button>
          {password && (
              <div className='inputContainerStyle'>
                  <label className='labelStyle'>Generated Password:</label>
                  <input type="text" value={password} readOnly className='inputStyle' />
                  <button
                      style={{
                          ...buttonStyle,
                          ...copyButtonStyle,
                      }}
                      onClick={copyToClipboard}
                  >
                      Copy
                  </button>
              </div>
          )}
          {successMessage && (
              <p
                  style={{
                      color: "green",
                      textAlign: "center",
                  }}
              >
                  {successMessage}
              </p>
          )}
      </div>
  );
};

export default App;


