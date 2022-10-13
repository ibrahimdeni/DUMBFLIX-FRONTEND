import React from 'react'
import MoviesContainer from '../components/MoviesContainer'
import title from '../images/jdlwitcher.png'
import TvShowsContainer from '../components/TvShowsContainer'

function Home() {
    return (
      <>
      <div>
        <div className='background-hero-home container-fluid mx-auto'>
          <div className='hero ms-5 text-light d-flex flex-column align-content-center justify-content-center'>
              {/* <h1 className='text-size text-start'>THE WITCHER</h1> */}
              <img className="object-fit" src={title} alt=""/>
              <p className=''>Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beast</p>
              <div className='mb-4'>
                <span>2013</span> 
                <button className='btn btn-outline-light ms-2 py-1 tv-s shadow'>TV Series</button>
              </div>
              <div>
              <button className='btn btn-watch text-light py-2 px-5 fs-4 shadow'>WATCH NOW!</button>
              </div>
          </div>
        </div>
      </div>
      
      <div style={{backgroundColor:"black", marginTop:"-36px"}}>
        <div>
          <MoviesContainer />
          <TvShowsContainer />
        </div>
      </div>

    {/* <div className='sectionSeries'> */}
      {/* <SeriesContainer /> */}
      {/* <MoviesContainer /> */}
    {/* </div> */}
      </>
    )
  }
  
  export default Home