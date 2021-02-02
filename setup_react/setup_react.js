const fs = require("fs");
const exeSync = require("child_process").execSync;
const args = process.argv.slice(2);
const projectFolder = args[0];
const redux = args[1];

if (!fs.existsSync(projectFolder)) {
  fs.mkdirSync(projectFolder);
}

process.chdir(projectFolder);

function executeCommandLine(commands) {
  commands.forEach((command) => {
    try {
      console.log("Command: ", command);
      const result = exeSync(command, { stdio: "inherit", shell: true });
      console.log(!result ? "Done" : result);
    } catch (error) {
      console.log(error);
    }
  });
}

function createProjectStructure(projectStructure) {
  projectStructure.forEach((item) => {
    try {
      console.log("Creating: ", item.name);
      if (item.type === "folder") {
        fs.mkdirSync(item.name);
      } else if (item.type === "file") {
        fs.writeFileSync(item.name, item.content, { flag: "w" });
      }
    } catch (error) {
      console.log(error.message);
    }
  });
}

function createReactApp() {
  const commands = [
    "npx create-react-app .",
    "npm i react-bootstrap bootstrap react-router-dom",
    "npm i axios react-toastify react-spinners",
  ];
  executeCommandLine(commands);
}

function setupProject() {
  fs.rmdirSync("src", { recursive: true });

  const projectStructure = [
    { name: "src", type: "folder" },
    {
      name: "src/index.js",
      type: "file",
      content: `import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));`,
    },
    {
      name: "src/App.js",
      type: "file",
      content: `import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PublicNavbar from "./components/PublicNavbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import AlertMsg from "./components/AlertMsg";

function App() {
  return (
    <Router>
      <PublicNavbar />
      <AlertMsg />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

export default App;`,
    },
    { name: "src/App.css", type: "file", content: "" },
    { name: "src/components", type: "folder" },
    {
      name: "src/components/PublicNavbar.js",
      type: "file",
      content: `import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../images/logo.svg";
import { NavLink } from "react-router-dom";

const PublicNavbar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>
        <img src={logo} alt="CoderSchool" width="200px" />
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={NavLink} exact={true} to="/">
          Home
        </Nav.Link>
        <Nav.Link as={NavLink} exact={true} to="/login">
          Login
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default PublicNavbar;`,
    },
    {
      name: "src/pages",
      type: "folder",
    },
    {
      name: "src/pages/HomePage.js",
      type: "file",
      content: `import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

const HomePage = () => {

  return (
    <Container>
      <h1>HomePage</h1>
    </Container>
  );
};

export default HomePage;`,
    },
    {
      name: "src/pages/LoginPage.js",
      type: "file",
      content: `import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

const LoginPage = () => {

  return (
    <Container>
      <h1>LoginPage</h1>
    </Container>
  );
};

export default LoginPage;`,
    },
    {
      name: "src/pages/NotFoundPage.js",
      type: "file",
      content: `import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const NotFoundPage = () => {
  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h1>404</h1>
          <p>The page you are looking for does not exist.</p>
        </Col>
      </Row>
    </Container>
  );
};
export default NotFoundPage;`,
    },
    {
      name: "src/components/AlertMsg.js",
      type: "file",
      content: `import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AlertMsg = () => {
  return (
    <ToastContainer
      position="top-right"
      hideProgressBar={false}
      newestOnTop={true}
      pauseOnHover
    />
  );
};

export default AlertMsg;`,
    },
    {
      name: "src/apiService.js",
      type: "file",
      content: `import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * console.log all requests and responses
 */
api.interceptors.request.use(
  (request) => {
    console.log("Starting Request", request);
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  function (error) {
    error = error.response.data;
    console.log("RESPONSE ERROR", error);
    return Promise.reject(error);
  }
);

export default api;`,
    },
    { name: "src/images", type: "folder" },
  ];

  createProjectStructure(projectStructure);
}

function setupRedux() {
  console.log("Setting up redux");
  const commands = [
    "npm i redux react-redux redux-thunk",
    "npm i redux-devtools-extension",
  ];
  executeCommandLine(commands);

  const reduxStructure = [
    { name: "src/redux", type: "folder" },
    { name: "src/redux/actions", type: "folder" },
    { name: "src/redux/constants", type: "folder" },
    { name: "src/redux/reducers", type: "folder" },
    {
      name: "src/redux/store.js",
      type: "file",
      content: `import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;`,
    },
    {
      name: `src/redux/reducers/index.js`,
      type: "file",
      content: `import { combineReducers } from "redux";
import authReducer from "./auth.reducer";

export default combineReducers({
  auth: authReducer,
});`,
    },
    {
      name: "src/redux/constants/auth.constants.js",
      type: "file",
      content: `export const LOGIN_REQUEST = "AUTH.LOGIN_REQUEST";
export const LOGIN_SUCCESS = "AUTH.LOGIN_SUCCESS";
export const LOGIN_FAILURE = "AUTH.LOGIN_FAILURE";

export const REGISTER_REQUEST = "AUTH.REGISTER_REQUEST";
export const REGISTER_SUCCESS = "AUTH.REGISTER_SUCCESS";
export const REGISTER_FAILURE = "AUTH.REGISTER_FAILURE";`,
    },
    {
      name: "src/redux/reducers/auth.reducer.js",
      type: "file",
      content: `import * as types from "../constants/auth.constants";
const initialState = {
  user: {},
  isAuthenticated: null,
  loading: false,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.LOGIN_REQUEST:
      return { ...state, loading: true };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        user: payload.user,
        accessToken: payload.accessToken,
        loading: false,
        isAuthenticated: true,
      };
    case types.LOGIN_FAILURE:
      return { ...state, loading: false, isAuthenticated: false };

    case types.REGISTER_REQUEST:
      return { ...state, loading: true };
    case types.REGISTER_SUCCESS:
      return { ...state, loading: false };
    case types.REGISTER_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default authReducer;`,
    },
    {
      name: "src/redux/actions/auth.actions.js",
      type: "file",
      content: `import * as types from "../constants/auth.constants";
import api from "../../apiService";
import { toast } from "react-toastify";

const loginRequest = ({ email, password }) => async (dispatch) => {
  dispatch({ type: types.LOGIN_REQUEST, payload: null });
  try {
    const res = await api.post("/auth/login", { email, password });
    dispatch({ type: types.LOGIN_SUCCESS, payload: res.data.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: types.LOGIN_FAILURE, payload: error });
  }
};

const register = ({name, email, password}) => async (dispatch) => {
  dispatch({ type: types.REGISTER_REQUEST, payload: null });
  try {
    const res = await api.post("/users", { name, email, password });
    dispatch({ type: types.REGISTER_SUCCESS, payload: res.data.data });
    toast.success(\`Thank you for your registration, \${name}!\`);
  } catch (error) {
    dispatch({ type: types.REGISTER_FAILURE, payload: error });
  }
};

const authActions = {
  loginRequest,
  register,
};
export default authActions;`,
    },
    {
      name: "src/pages/LoginPage.js",
      type: "file",
      content: `import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import authActions from "../redux/actions/auth.actions";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (password.length < 3) {
      setErrors({ ...errors, password: "Password must be longer than 3" });
      return;
    }
    dispatch(authActions.loginRequest({email, password}));
  };

  if (isAuthenticated) return <Redirect to="/" />;
  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit}>
            <div className="text-center mb-3">
              <h1 className="text-primary">Sign In</h1>
              <p className="lead">
                Sign Into Your Account
              </p>
            </div>
            <Form.Group>
              <Form.Control
                type="email"
                required
                placeholder="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <small className="form-text text-danger">{errors.email}</small>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                minLength="3"
              />
              {errors.password && (
                <small className="form-text text-danger">
                  {errors.password}
                </small>
              )}
            </Form.Group>

            {loading ? (
              <Button
                className="btn-block"
                variant="primary"
                type="button"
                disabled
              >
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading...
              </Button>
            ) : (
              <Button className="btn-block" type="submit" variant="primary">
                Login
              </Button>
            )}
            <p>
              Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;`,
    },
    {
      name: "src/pages/RegisterPage.js",
      type: "file",
      content: `import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import authActions from "../redux/actions/auth.actions";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const loading = useSelector((state) => state.auth.loading);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, password2 } = formData;
    if (password !== password2) {
      setErrors({ ...errors, password2: "Passwords do not match" });
      return;
    }
    dispatch(authActions.register({name, email, password}));
  };

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <div className="text-center mb-3">
            <h1 className="text-primary">Sign Up</h1>
            <p className="lead">
              Create Your Account
            </p>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <small className="form-text text-danger">{errors.name}</small>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="email"
                placeholder="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <small className="form-text text-danger">{errors.email}</small>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <small className="form-text text-danger">
                  {errors.password}
                </small>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={formData.password2}
                onChange={handleChange}
              />
            </Form.Group>

            {loading ? (
              <Button
                className="btn-block"
                variant="primary"
                type="button"
                disabled
              >
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading...
              </Button>
            ) : (
              <Button className="btn-block" type="submit" variant="primary">
                Register
              </Button>
            )}

            <p>
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;`,
    },
    {
      name: "src/App.js",
      type: "file",
      content: `import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PublicNavbar from "./components/PublicNavbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import AlertMsg from "./components/AlertMsg";

function App() {
  return (
    <Router>
      <PublicNavbar />
      <AlertMsg />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

export default App;`,
    },
    {
      name: "src/components/PublicNavbar.js",
      type: "file",
      content: `import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../images/logo.svg";
import { useSelector } from "react-redux";

const PublicNavbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const handleLogout = () => {
    // TODO
  };
  const authLinks = (
    <Nav>
      <Nav.Link as={Link} to="/admin/profile">
        Admin
      </Nav.Link>
      <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
    </Nav>
  );
  const publicLinks = (
    <Nav>
      <Nav.Link as={Link} to="/register">
        Register
      </Nav.Link>
      <Nav.Link as={Link} to="/login">
        Login
      </Nav.Link>
    </Nav>
  );

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/" className="mr-auto">
        <img src={logo} alt="CoderSchool" width="200px" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto"></Nav>
        {!loading && <>{isAuthenticated ? authLinks : publicLinks}</>}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default PublicNavbar;`,
    },
    {
      name: "src/index.js",
      type: "file",
      content: `import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);`,
    },
  ];

  createProjectStructure(reduxStructure);
}

function main() {
  createReactApp();
  setupProject();
  if (redux) {
    setupRedux();
  }
}

main();
