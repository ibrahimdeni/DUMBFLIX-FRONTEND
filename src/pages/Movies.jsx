import React from "react";
import MoviesContainer from "../components/MoviesContainer";
import title from '../images/Tjoker.png'

const Movie = () => {
  return (
    <>
      <div>
        <div className="background-hero-movie container-fluid mx-auto">
          <div className="hero ms-5 text-light d-flex flex-column align-content-center justify-content-center">
          {/* <h1 className='text-size text-start'>JOKER</h1> */}
          <img src={title} style={{width:"350px"}}/>
          {/* <img src={bgHero} alt="" style={{width:"100%", height:"100vh", backgroundSize:"cover"}} /> */}
            <p className="">
            In Gotham City, mentally troubled comedian Arthur Fieck is disregarded and mistreated by society. Arthur wears two masks -- the one he paints for his day job as a clown, and the guise he projects in a futile attempt to feel like he's part of the world around him. </p>
            <div className="mb-4">
              <span>2019</span>
              <button className="btn btn-outline-light ms-2 py-1 tv-s shadow">
                Movie
              </button>
            </div>
            <div>
              <button className="btn btn-watch text-light py-2 px-5 fs-4 shadow">
                WATCH NOW!
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{backgroundColor:"black", marginTop:"-38px"}}>
        <div>
          <MoviesContainer />
        </div>
      </div>
      {/* <MoviesContainer /> */}
    </>
  );
};

export default Movie;
