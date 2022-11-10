import axios from "axios";

const requestGetLoginInfo = () => {
  return {
    requestToken: () =>
      axios.request({
        method: "GET",
        url: `${process.env.REACT_APP_API_PATH_REQUEST_TOKEN}${process.env.REACT_APP_API_KEY}`,
      }),
    Authentication: (username, password, requestToken) =>
      axios.request({
        method: "POST",
        url: `${process.env.REACT_APP_API_PATH_SESSION_LOGIN}${process.env.REACT_APP_API_KEY}`,
        data: {
          username: username,
          password: password,
          request_token: requestToken,
        },
      }),
    sessionRequestToken: (requestToken) =>
      axios.request({
        method: "POST",
        url: `${process.env.REACT_APP_API_PATH_SESSION}${process.env.REACT_APP_API_KEY}`,
        data: {
          request_token: requestToken,
        },
      }),
    userInfo: (sessionId) =>
      axios.request({
        method: "GET",
        url: `${process.env.REACT_APP_API_PATH_ACCOUNT_INFO}${process.env.REACT_APP_API_KEY}&session_id=${sessionId}`,
      }),
  };
};

export default requestGetLoginInfo;
