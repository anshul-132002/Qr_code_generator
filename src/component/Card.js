import React, { useState } from "react";

const Card = () => {
  const [input, setInput] = useState("");
  const [qr, setQr] = useState();
  const [isloading, setisLoading] = useState(false);

  const getQRCode= async (e) =>
  {
    e.preventDefault()

    try {
        setisLoading(true)
        const res = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${input}`)
    console.log(res);
    setQr(res.url)
    
    
    } catch (error) {
        console.log(error);
    }
    finally{
        setisLoading(false)
    }
  }
  return (
    <form className="form" onSubmit={getQRCode}>
          <h1 className="title">QR code generator</h1>
          <input
              type="text"
              className="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
              placeholder="Enter the Url Or the Text " />
          {isloading && (
              <div className="loading">
                  <span></span>Loadng ..
              </div>
          )}
          {!isloading &&
              (qr ? (
                  <img className="qr-code" src={qr} alt="qr-code" />
              ) : (
                  <div className="loading">Generating your QR code </div>
              ))}

          <input type="submit" className="submit" value="Generate QR-code" />
          </form>
  );
};

export default Card;
