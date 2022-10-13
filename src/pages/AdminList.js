import React from "react";
import TvShowsContainer from "../components/TvShowsContainer";
import MoviesContainer from "../components/MoviesContainer";
// import bgHero from '../images/la-casa-de-papel-logo.png'
// import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import { API } from "../config/api";
import { useQuery } from "react-query";
import { useState } from "react";

const AddFilmList = () => {
  let { data: films } = useQuery("filmsCache", async () => {
    const response = await API.get("/films");
    return response.data.data;
  });

  const [category, setCategory] = useState("TV Series");

  return (
    <>
      <div style={{ backgroundColor: "black", marginTop: "10vh" }}>
        <div>
          <div className="d-flex">
            <h3 style={{ marginLeft: "8vw" }}>List Film</h3>
            <div className="d-flex" style={{ marginLeft: "20px" }}>
              <select
                value={category}
                onChange={(e) => setCategory(() => e.target.value)}
                className="bg-black text-white"
                style={{ borderRadius: "8px" }}
                name="list"
              >
                <option disabled selected>
                  Category
                </option>
                <option>TV Series</option>
                <option>Movie</option>
              </select>
            </div>
            <div
              className="d-flex justify-content-end me-5"
              style={{ width: "65%" }}
            >
              <Button href="/add-film" variant="danger" className="pe-4 ps-4">
                Add Film
              </Button>
            </div>
          </div>
          {category === "TV Series" ? (
            <TvShowsContainer />
          ) : (
            <MoviesContainer />
          )}
        </div>
      </div>
    </>
  );
};
export default AddFilmList;
