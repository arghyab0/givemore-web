//components
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

//pages
import { useEffect } from "react";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Reset from "./pages/Reset";
import Dashboard from "./pages/Dashboard";

//hoc
import WithAuth from "./hoc/WithAuth";

//redux stuff
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./redux/user.action";

//utils
import { auth, handleUserProfile } from "./firebase/utils";

//stylesheets
import "./default.scss";

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          dispatch(
            setCurrentUser({
              id: snapshot.id,
              ...snapshot.data(),
            })
          );
        });
      }

      dispatch(setCurrentUser(userAuth));
    });

    return () => {
      authListener();
    };
  });

  return (
    <div className="App">
      <Header />
      <div className="main">
        <Switch>
          <Route exact path="/" component={Home} />

          <Route path="/register" component={Register} />

          <Route path="/login" component={Login} />

          <Route exact path="/reset" component={Reset} />

          <Route
            exact
            path="/dashboard"
            render={() => (
              <WithAuth>
                <Dashboard />
              </WithAuth>
            )}
          />
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default App;
