import React from "react";
import Logo from "../images/logo.png";
import "../App.css";
import { useState, useContext } from "react";
import RegisterModal from "./RegisterModal";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
// import userPhoto from "../images/user.png";
// import { Dropdown } from "react-bootstrap";
// import {FaUser, FaMoneyCheckAlt, FaSignOutAlt} from 'react-icons/fa'
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import "../assets/styles/style.css";
import Images from "../assets/Icons/icons";
import ProfileDum from "../assets/images/profiledum.jpg";
import { UserContext } from "../context/UserContext";

const style = {
  brand: {
    color: "red",
    paddingRight: "3vw",
  },
  profileContainer: {
    width: "40px",
    height: "40px",
  },
  profileImage: {
    borderRadius: "100%",
    width: "40px",
    height: "40px",
    objectFit: "cover",
    border: "2px solid white",
  },
};

function NavbarAdm() {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [state, dispatch] = useContext(UserContext);
  const user = localStorage.getItem("token");

  const [isLoginAdmin, setIsLoginAdmin] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    if (user) {
      setIsLoginAdmin(true);
    } else setIsLoginAdmin(false);
  }, [state, handleLogout]);

  return (
    <nav className="navbar navbar-expand-lg bg-dark shadow sticky-top">
      <div className="container-fluid ">
        <div className="ms-5" style={style.brand}>
          <Link to="/admin">
            <img src={Images.Dumbflix} alt="Dumbflix" />
          </Link>
        </div>
        <button
          className="navbar-toggler bg-white"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse d-flex justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 navbarUl">
            <li className="nav-item">
              <Link
                className="nav-link active text-light"
                aria-current="page"
                to="/transaction"
              >
                Transactions
              </Link>
            </li>
          </ul>
          <div>
            {isLoginAdmin ? (
              <Navbar bg="dark" variant="dark" expand="lg" className="navbar">
                <Container fluid className="">
                  <Navbar.Toggle aria-controls="navbarScroll" />
                  <Navbar.Collapse id="navbarScroll">
                    <Nav
                      className="me-auto my-2 my-lg-0"
                      style={{ maxHeight: "100px" }}
                      navbarScroll
                    >
                      {/* <Navbar.Brand href="/admin" className='ms-5' style={style.brand}>
                        <img src={Images.Dumbflix} alt=''/>
                      </Navbar.Brand> */}
                    </Nav>
                    <div className="me-5 ms-auto">
                      <NavDropdown
                        title={
                          <div style={style.profileContainer}>
                            <img
                              src={ProfileDum}
                              alt=""
                              className="img-fluid"
                              style={style.profileImage}
                            />
                          </div>
                        }
                        className="navDrop ms-auto me-auto"
                        id="navbarScrollingDropdown"
                        menuVariant="dark"
                        align="end"
                      >
                        <NavDropdown.Item as={Link} to="/add-film-list">
                          <img
                            src={Images.Film}
                            alt=""
                            className="filmDropdown ms-2 me-2"
                          ></img>{" "}
                          Film
                        </NavDropdown.Item>
                        <NavDropdown.Divider className="bg-light dropDivid" />
                        <NavDropdown.Item href="#" onClick={handleLogout}>
                          <img
                            src={Images.Logout}
                            alt=""
                            className="filmDropdown ms-2 me-2"
                          ></img>{" "}
                          Log Out
                        </NavDropdown.Item>
                      </NavDropdown>
                    </div>
                  </Navbar.Collapse>
                </Container>
              </Navbar>
            ) : (
              <Button
                variant="primary"
                className="btn bg-white text-danger fw-bold border-0 btn-regis py-1 me-3"
                onClick={handleShow}
              >
                SIGN IN
              </Button>
            )}
            <RegisterModal handleClose={handleClose} show={show} />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavbarAdm;
