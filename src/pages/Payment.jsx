import React, { useEffect, useState, useContext, useRef } from "react";
import { UserContext } from "../context/UserContext";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { BsPaperclip } from "react-icons/bs";
import { API } from "../config/api";

function BasicExample() {
  const [state] = useContext(UserContext);
  console.log("ini data beli", state.user.id);

  let Navigate = useNavigate();

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const handleBuy = useMutation(async (e) => {
    e.preventDefault();
    try {
      // const data = { user_id: state.user.id };
      // console.log("iki data transaksi", data);

      console.log("inidata enu", state.user.id);
      // const body = JSON.stringify(data);

      // const config = {
      //   headers: {
      //     "Content-type": "application/json",
      //   },
      // };

      const response = await API.post("/transaction");
      console.log(response);

      // Create variabel for store token payment from response here ...
      const token = response.data.data.token;

      console.log(token);

      // Init Snap for display payment page with token here ...
      window.snap.pay(token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          Navigate("/profile");
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          Navigate("/profile");
        },
        onError: function (result) {
          /* You may add your own implementation here */
          console.log(result);
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("You closed the popup without finishing the payment");
        },
      });
    } catch (error) {
      console.log(error);
    }
  });

  const title = "Be Premium";
  document.title = "Dumbflix | " + title;

  const [previewSrc, setPreviewSrc] = useState(null);
  const [file, setFile] = useState(null);

  const onChangeFiles = (e) => {
    let fileInfo = e.target.files[0];
    setFile(fileInfo);
    let reader = new FileReader();

    if (e.target.files.length === 0) {
      return;
    }

    reader.onloadend = (e) => {
      setPreviewSrc([reader.result]);
    };

    reader.readAsDataURL(fileInfo);
  };

  const inputFileRef = useRef(null);

  const onBtnClick = () => {
    inputFileRef.current.click();
  };

  return (
    <div style={{ height: "100vh", backgroundColor: "black" }}>
      <div
        className="d-flex justify-content-center"
        style={{ marginTop: "100px" }}
      >
        <h1 className="text-light text-center fw-bold mb-5">Premium</h1>
      </div>

      <div>
        <p className="fw-bold fs-2  text-center" style={{ color: "yellow" }}>
          DISCOUNT GRAND LAUNCING!!!
        </p>
        <p className="text-light text-center">
          Bayar{" "}
          <span className="fw-bold" style={{ color: "yellow" }}>
            hanya Rp. 30.000,00-{" "}
            <span className="text-decoration-line-through text-muted">
              Rp. 65.000,00-
            </span>
          </span>{" "}
        </p>

        <p className="text-light text-center">
          dan nikmati streaming film-film kekinian dari{" "}
          <span className="fw-bold" style={{ color: "red" }}>
            DUMBFLIX
          </span>
        </p>

        <p className="text-light text-center fw-bold">
          info lebih lanjut hubungi
        </p>

        <p className="text-light text-center">
          <span className="fw-bold" style={{ color: "red" }}>
            DUMBFLIX{" "}
          </span>
          : 0981312323
        </p>

        <Form
          className="mt-5 w-50 mx-auto"
          style={{ backgroundColor: "black" }}
        >
          {/* <Form.Group
            className="mb-5 w-50 mx-auto"
            controlId="formBasicPassword"
          >
            <Form.Label className="placeHolderFile rounded">
              Attache proof of transfer{" "}
              <span>
                <BsPaperclip style={{ fontSize: "25px" }} />
              </span>
            </Form.Label>
            <Form.Control type="file" onClick={(e) => onBtnClick()} />
            <input
              onChange={(e) => onChangeFiles(e)}
              type="file"
              name="file"
              ref={inputFileRef}
              style={{ display: "none" }}
            />
          </Form.Group> */}

          <div className="w-100">
            <Button
              onClick={(e) => handleBuy.mutate(e)}
              className="mb-3 w-50 mx-auto fw-bold d-flex justify-content-center"
              style={{ backgroundColor: "red" }}
              type="submit"
            >
              Activasi Member Sekarang?
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default BasicExample;
