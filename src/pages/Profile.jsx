import React from "react";
import {
  FaEnvelopeSquare,
  FaFemale,
  FaMale,
  FaMapMarkerAlt,
  FaPhone,
  FaTicketAlt,
  FaUserCircle,
} from "react-icons/fa";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import profileUser from "../images/profileUser.png";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { API } from "../config/api";
import { useQuery } from "react-query";

function Profile() {
  const [state, dispatch] = useContext(UserContext);
  console.log("ini state diProfil", state);

  return (
    <div style={{ width: "100%", height: "100%" }} className="bg-dark">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} className="mt-5 mb-5">
            <Card className="rounded shadow border-0 bg-dark text-white p-5">
              <div className="d-flex justify-content-between">
                <div className="me-5">
                  <h3>Personal Info</h3>
                  <div className="mt-3">
                    {/* Full Name */}
                    <div className="d-flex mb-3 align-items-start">
                      <FaUserCircle
                        className="me-3 fs-1"
                        style={{ color: "red" }}
                      />
                      <div>
                        <h5>
                          {state.user.fullname}
                          {state.isAdmin && (
                            <Badge className="ms-1" bg="secondary">
                              Admin
                            </Badge>
                          )}
                        </h5>
                        <p className="text-muted">Full Name</p>
                      </div>
                    </div>
                    {/* Email */}
                    <div className="d-flex mb-3 align-items-start">
                      <FaEnvelopeSquare
                        className="me-3 fs-1"
                        style={{ color: "red" }}
                      />
                      <div>
                        <h5>{state.user.email}</h5>
                        <p className="text-muted">Email Address</p>
                      </div>
                    </div>
                    {/* Status */}
                    <div className="d-flex mb-3 align-items-start">
                      <FaTicketAlt
                        className="me-3 fs-1"
                        style={{ color: "red" }}
                      />
                      <div>
                        <h5>{state.user.subscribe}</h5>
                        <p className="text-muted">Status</p>
                      </div>
                    </div>
                    {/* Gender */}
                    <div className="d-flex mb-3 align-items-start">
                      {state.user.gender === "Male" ? (
                        <FaMale
                          className="me-3 fs-1"
                          style={{ color: "red" }}
                        />
                      ) : (
                        <FaFemale
                          className="me-3 fs-1"
                          style={{ color: "red" }}
                        />
                      )}
                      <div>
                        <h5>{state.user.gender}</h5>
                        <p className="text-muted">Gender</p>
                      </div>
                    </div>
                    {/* Phone */}
                    <div className="d-flex mb-3 align-items-start">
                      <FaPhone className="me-3 fs-1" style={{ color: "red" }} />
                      <div>
                        <h5>{state.user.phone}</h5>
                        <p className="text-muted">Phone Number</p>
                      </div>
                    </div>
                    {/* Address */}
                    <div className="d-flex mb-3 align-items-start">
                      <FaMapMarkerAlt
                        className="me-3 fs-1"
                        style={{ color: "red" }}
                      />
                      <div>
                        <h5>{state.user.address}</h5>
                        <p className="text-muted">Address</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex bg-warning flex-column align-items-center justify-content-center">
                  <img
                    className="rounded"
                    src={profileUser}
                    alt="nophoto"
                    height={400}
                  />
                  <Button
                    style={{ backgroundColor: "red" }}
                    variant="danger"
                    className="changePhotoBtn mt-2 btn-md px-2 py-1 ms-1 fw-bold"
                  >
                    Change Photo
                  </Button>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Profile;
