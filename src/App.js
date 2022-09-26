import "./App.css";
import Layout from "./widgets/Layout";
import LayoutAdm from "./widgets/LayoutAdmin";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import AdminHome from "./pages/AdminHome";
import Movies from "./pages/Movies";
import TvShows from "./pages/TvShows";
import AddFilmList from "./pages/AdminList";
// import Profile from './pages/Profile';
import Payment from "./pages/Payment";
// import VideoDetail from './pages/VideoDetail';
import IncomingTransactions from "./pages/IncomingTransactions";
import AddFilm from "./pages/AddFilmForm";
import Profile from "./pages/Profile";
import VideoDetail from "./pages/VideoDetail";
// import VideoDetailAdm from "./pages/VideoDetailAdm";
import { API, setAuthToken } from "./config/api";
import { useContext, useState } from "react";
import { UserContext } from "./context/UserContext";
import { useEffect } from "react";
import PrivateRoute from "./components/PrivateRoute";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext); //untuk manggil usecontext yang mana usecontext menampung usercontext
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkUser = async () => {
    try {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      const response = await API.get("/check-auth");
      // return console.log("response",response.data.data)
      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "AUTH_SUCCESS",
        payload,
      });
      setIsLogged(true);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    } else {
      setIsLoading(false);
    }
    console.log("cobaa state", state);
    console.log("isloading", isLoading);
  }, [isLoading]);

  return (
    <Routes>
      <>
        {isLoading ? (
          <></>
        ) : (
          <>
            <Route />

            {/* FOR USER */}
            <Route
              path="/"
              element={
                state.isAdmin ? (
                  <LayoutAdm>
                    <Home />
                  </LayoutAdm>
                ) : (
                  <Layout>
                    <Home />
                  </Layout>
                )
              }
            />

            <Route
              path="/movies"
              element={
                <Layout>
                  <Movies />
                </Layout>
              }
            />

            <Route
              path="/tvshows"
              element={
                <Layout>
                  <TvShows />
                </Layout>
              }
            />

            {/* <Route element={<PrivateRoute isLogged={isLogged} />}> */}
            <Route
              path="/payment"
              element={
                <Layout>
                  <Payment />
                </Layout>
              }
            />
            {/* </Route> */}

            {/* <Route element={<PrivateRoute isLogged={isLogged} />}> */}
            <Route
              path="/video/:id"
              element={
                <Layout>
                  <VideoDetail />
                </Layout>
              }
            />
            {/* </Route> */}

            <Route
              path="/profile"
              element={
                <Layout>
                  <Profile />
                </Layout>
              }
            />

            {/* FOR ADMIN */}
            {/* <Route element={<PrivateRoute isLogged={isLogged} />}> */}
            <Route
              path="/admin"
              element={
                <LayoutAdm>
                  <AdminHome />
                </LayoutAdm>
              }
            />
            {/* </Route> */}

            {/* <Route element={<PrivateRoute isLogged={isLogged} />}> */}
            <Route
              path="/transaction"
              element={
                <LayoutAdm>
                  <IncomingTransactions />
                </LayoutAdm>
              }
            />
            {/* </Route> */}

            <Route element={<PrivateRoute isLogged={isLogged} />}>
              <Route
                path="/add-film-list"
                element={
                  <LayoutAdm>
                    <AddFilmList />
                  </LayoutAdm>
                }
              />
            </Route>

            <Route element={<PrivateRoute isLogged={isLogged} />}>
              <Route
                path="/add-film"
                element={
                  <LayoutAdm>
                    <AddFilm />
                  </LayoutAdm>
                }
              />
            </Route>

            {/* <Route
          path="/video-adm"
          element={
            <LayoutAdm>
              <VideoDetailAdm />
            </LayoutAdm>
          }
        /> */}
          </>
        )}
      </>
    </Routes>
  );
}

export default App;
