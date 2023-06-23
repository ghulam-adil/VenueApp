import { store } from "../redux/store";

import Toast from "react-native-toast-message";

export const showToast = (msg) => {
  setTimeout(() => {
    Toast.show(getMessage(msg));
  }, 500);
};

export const handleResponse = ({ response, jsonResponse }) => {
  // console.log('AAAAA', jsonResponse.error);
  switch (response.status) {
    case 200: {
      console.log("case 200");
      if (
        jsonResponse.hasOwnProperty("errors") ||
        (jsonResponse.hasOwnProperty("error") && jsonResponse.error == true)
      ) {
        // console.log('TRUEEEEEEE');
        const message = getMessage(jsonResponse);
        return Promise.reject(message);
      } else {
        // console.log('FALSEEEEEE', jsonResponse);
        return Promise.resolve(jsonResponse);
      }
      break;
    }
    case 201: {
      console.log("case 201");
      if (
        jsonResponse.hasOwnProperty("errors") ||
        (jsonResponse.hasOwnProperty("error") && jsonResponse.error == true)
      ) {
        const message = getMessage(jsonResponse);
        return Promise.reject(message);
      } else {
        return Promise.resolve(jsonResponse);
      }
      break;
    }
    case 401: {
      const message = getMessage(jsonResponse);
      return Promise.reject(message);
    }
    default: {
      const message = getMessage(jsonResponse);
      return Promise.reject(message);
    }
  }
};
export const performNetworkRequest = async (url, configs) => {
  url = encodeURI(url);
  try {
    const response = await fetch(url, configs);
    const jsonResponse = await response.json();
    return Promise.resolve({ response, jsonResponse });
  } catch (e) {
    return Promise.reject(e);
  }
};
// export const log = (label, data) => {
//   if (__DEV__) {
//     console.log(TAG + `__${label}__ :`, data);
//   }
// };
export const message = "Something went wrong";
export const getMessage = (json) => {
  console.log("JSON   KKKKKK", json);
  switch (typeof json) {
    case "string": {
      return json;
    }
    case "object": {
      console.log("OBJEEXXXTTTT CASE");
      if (Array.isArray(json)) {
        console.log("IS ARRAAYYYYY");
        var data = json[0];
        return getMessage(data);
      } else {
        console.log("NOT ARRAAYYYYY");
        if (json.errors) {
          const data = json.errors;
          if (typeof data === "object") {
            const values = Object.values(data);
            return getMessage(values);
          } else {
            return getMessage(data);
          }
        } else if (json.data?.errors) {
          console.log("DATAAA ERRORS");
          const data = json.data?.errors;
          if (typeof data === "object") {
            const values = Object.values(data);
            return getMessage(values);
          } else {
            return getMessage(data);
          }
        } else {
          if (json.message) {
            return getMessage(json.message);
          } else if (json.error) {
            return getMessage(json.error);
          } else {
            return message;
          }
        }
      }
    }
    default: {
      return message;
    }
  }
};
export const jsonToFormdata = (json) => {
  var data = new FormData();
  const entries = Object.entries(json);
  entries.forEach((entry) => {
    data.append(entry[0], entry[1]);
  });
  return data;
};
export const getConfigs = (method, body, formData = true) => {
  var headers = {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
  };
  if (formData == true) {
    headers["Content-Type"] = "multipart/form-data";
  }
  const data = store.getState();
  if (data) {
    if (data.auth) {
      if (data.auth.token != null) {
        if (data.auth.token) {
          headers["Authorization"] = "Bearer " + data.auth.token;
        }
      }
    }
  }
  var configs = {
    method: method,
    headers: headers,
  };
  if (body) {
    if (method == "POST" || method == "PUT") {
      if (formData == true) {
        configs["body"] = jsonToFormdata(body);
      } else {
        configs["body"] = JSON.stringify(body);
      }
    }
  }
  return configs;
};
export const dataToQueryParameter = (data) => {
  if (typeof data === "object") {
    if (!Array.isArray(data)) {
      var params = "?";
      const dataArray = Object.entries(data);
      if (dataArray.length > 0) {
        dataArray.forEach((entry, index) => {
          var amp = index < dataArray.length - 1 ? "&" : "";
          params = `${params}${entry[0]}=${entry[1]}${amp}`;
        });
        return params;
      }
    }
  } else if (typeof data === "string") {
    return data;
  }
  return "";
};
