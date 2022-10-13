import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import MoviesList from "./MoviesList";
// import dataMovies from '../dataDummy/MoviesData'
// console.log(dataMovies)
import { useQuery } from "react-query";
import { API } from "../config/api";

const MoviesContainer = () => {
  let { data: films } = useQuery("moviesCache", async () => {
    const response = await API.get("/films");
    console.log("response film", response);

    const resultResponse = response.data.data;

    const resultFilter = resultResponse.filter(
      (data) => data.category.id === 1
    );
    return resultFilter;
  });

  console.log(films);

  return (
    <div>
      <Container className="overflow-hidden" id="">
        <h3 className="text-light mt-4 mb-3">Movies</h3>
        <Row>
          {films?.map((movies, index) => {
            return (
              <Col md={2} key={index}>
                <MoviesList
                  id={movies.id}
                  movieImg={movies.image}
                  title={movies.title}
                  year={movies.year}
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default MoviesContainer;
