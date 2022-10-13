import React, { useEffect, useState, useContext } from "react";
// import witcher from "../images/witcher.png";
// import inplayww from "../images/inplayww.png";
// import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../config/api";

function VideoDetail() {
  const [isLogin, setIsLogin] = useState(false);
  const [state] = useContext(UserContext);
  console.log("ini state video detail", state);

  const { id } = useParams();
  const navigate = useNavigate();

  let { data: films } = useQuery("detailCache", async () => {
    const response = await API.get("/film/" + id);
    return response.data.data;
  });

  useEffect(() => {
    if (state) setIsLogin(true);
    else {
      setIsLogin(false);
      alert("Silahkan Sign In");
      navigate("/");
    }
  }, [state]);

  return (
    <>
      <div className="d-flex justify-content-center bg-dark">
        <iframe
          width="853"
          height="480"
          src={films?.linkfilm}
          title="-"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>

      <div className="w-100 bg-black" style={{ marginTop: "-50px" }}>
        <div className="d-flex justify-content-start sectionMain mt-5 flex-column flex-md-row bg-black">
          <div
            className="card mt-5 mb-3 bg-black text-white"
            style={{ maxWidth: "540px" }}
          >
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={films?.image}
                  className="img-fluid rounded-start imgDummyDetail"
                  alt="Series"
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title fs-1">{films?.title}</h5>
                  <div className="mb-4 mt-2">
                    <small className="text-muted">{films?.year}</small>
                    <small className="border border-secondary ms-2 px-1 ms-3 py-1 rounded text-muted tv-s shadow">
                      TV Series
                    </small>
                  </div>
                  <p className="card-text pDetailMain">{films?.description}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="cardEpisode mt-5">
            <img src={films?.image} alt="episode" className="imgEpisode" />
            <small className="text-light">{films?.title}</small>
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoDetail;
