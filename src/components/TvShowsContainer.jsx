import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import TvShowsList from "./TvShowsList";
// import data from "../dataDummy/TvShowsData";
import { useQuery } from "react-query";
import { API } from "../config/api";

const SeriesContainer = () => {
  let { data: films } = useQuery("seriesCache", async () => {
    const response = await API.get("/films");
    console.log("response film", response);

    const resultResponse = response.data.data;

    const resultFilter = resultResponse.filter(
      (data) => data.category.id === 2
    );
    return resultFilter;
  });

  console.log(films);

  return (
    <div>
      <Container className="overflow-hidden" id="">
        <h3 className="text-light mt-4 mb-3">TV Series</h3>
        <Row>
          {films?.map((series, index) => {
            return (
              <Col md={2} key={index}>
                <TvShowsList
                  id={series.id}
                  seriesImg={series.image}
                  title={series.title}
                  year={series.year}
                />{" "}
                {/* Looping */}
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default SeriesContainer;
