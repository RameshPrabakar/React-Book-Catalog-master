import axios from "axios";

const client= axios.create({
  baseURL: "http://localhost:9000",
  headers: {
    "Content-type": "application/json"
  }
});

const onSuccess = (response) => {
  console.log('Request Successful!', response);
  return response.data;
};

const onError = (error) => {
  console.error('Request Failed:', error.config);

  if (error.response) {
    // Request was made but server responded with something
    console.error('Status:', error.response.status);
    console.error('Data:', error.response.data);
    console.error('Headers:', error.response.headers);

  } else {
    // Something else happened while setting up the request
    // triggered the error
    console.error('Error Message:', error.message);
  }

  return Promise.reject(error.response || error.message);
};

/**
 * Request Wrapper with default success/error actions
 */
const request = (options) => {
  return client(options)
    .then(onSuccess)
    .catch(onError);
};

/* Api Calls
(get, post, put, delete)
*/
const get = (url, config) => {
  return request({
    url: `${url}`,
    method: 'GET',
    ...config
  });
};

const post = (url, data, config) => {
  return request({
    url: `${url}`,
    method: 'POST',
    data: data || {},
    ...config
  });
};

const put = (url, data, config) => {
  return request({
    url: `${url}`,
    method: 'PUT',
    data: data || {},
    ...config
  });
};

const remove = (url, data, config) => {
   return request({
    url: `${url}`,
    method: 'DELETE',
    data: data || {},
    ...config
  });
};

const HttpService = {
  get, post, put, remove
};


export { HttpService };
