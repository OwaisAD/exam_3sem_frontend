import { BASE_API_URL as URL } from "../../settings";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const handleHttpErrors = async (res) => {
  if (!res.ok) {
    return await Promise.reject({ status: res.status, fullError: res.json() });
  }
  return await res.json();
};

function apiFacade() {
  const setToken = (token) => {
    localStorage.setItem("jwtToken", token);
  };

  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };

  const getRole = () => {
    // return localStorage.getItem("roles");
    const parsedJWT = parseJwt(localStorage.getItem("jwtToken"));
    return parsedJWT ? parsedJWT.roles : null;
  };

  const setUsername = (username) => {
    return localStorage.setItem("username", username);
  };

  const getUsername = () => {
    const parsedJWT = parseJwt(localStorage.getItem("jwtToken"));
    return parsedJWT ? parsedJWT.name : null;
  };

  const setUserId = (userid) => {
    return localStorage.setItem("userId", userid);
  };

  const getUserId = () => {
    localStorage.getItem("userId");
  };

  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("roles");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("isLoggedIn");
  };

  const login = async (username, password) => {
    const options = makeOptions("POST", true, {
      username: username,
      password: password,
    });

    return await fetch(URL + "/login", options)
      .then(handleHttpErrors)
      .then((res) => {
        console.log(res);
        setToken(res.token);
        return parseJwt(res.token);
      })
      .then((response) => {
        setUsername(response.name);
        window.localStorage.setItem("isLoggedIn", true);
      });
  };

  const createUser = async (username, email, password, age) => {
    const options = makeOptions("POST", false, {
      username,
      password,
      age,
      email,
    });

    return await fetch(URL + "/users", options).then(handleHttpErrors);
  };

  const updateUser = async (userObject) => {
    const options = makeOptions("PUT", true, userObject);

    return await fetch(URL + "/users/me/update", options).then(handleHttpErrors);
  };

  const fetchData = async () => {
    const options = makeOptions("GET", true);

    return await fetch(URL + "/users/me", options).then(handleHttpErrors);
  };

  const getAllTrips = async () => {
    const options = makeOptions("GET", true);

    return await fetch(URL + "/trips", options).then(handleHttpErrors);
  };

  const addPersonToTrip = async (tripId, personObject) => {
    const options = makeOptions("POST", true, personObject);

    return await fetch(URL + `/trips/${tripId}/person`, options).then(handleHttpErrors);
  };

  const removePersonFromTrip = async (tripId, personId) => {
    const options = makeOptions("DELETE", true);

    return await fetch(URL + `/trips/${tripId}/person/${personId}`, options).then(handleHttpErrors);
  };

  const removeTripByTripId = async (tripId) => {
    const options = makeOptions("DELETE", true);
    return await fetch(URL + `/trips/${tripId}`, options).then(handleHttpErrors);
  };

  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };

  return {
    makeOptions,
    setToken,
    getToken,
    getRole,
    getUserId,
    loggedIn,
    login,
    logout,
    fetchData,
    setUsername,
    getUsername,
    createUser,
    updateUser,
    getAllTrips,
    addPersonToTrip,
    removePersonFromTrip,
    removeTripByTripId,
  };
}
const facade = apiFacade();
export default facade;
