import axios from "axios";

export async function getAllDocuments(token) {
  const url = `http://ihiapps.com:8080/wildbase/documents/list`;
  let response = await axios.get(url, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const docsArray = response?.data?.response?.data;
  return docsArray;
}

export async function getUsersFunction(pageNumber, pageSize, token) {
  const url = `http://ihiapps.com:8080/wildbase/users/list/${pageNumber}/${pageSize}`;
  console.log("cam in api page", pageNumber, pageSize, token);
  let response = await axios.get(url, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response?.data?.response?.users;
}


export async function updateStatus(type,documentId, status,token) {
  const url = `http://ihiapps.com:8080/wildbase/documents/status/update/${type}?documentId=${documentId}&status=${status}`;
  console.log('url is', url)
  let response = await axios.post(url,{},{
    headers:{
      Authorization:"Bearer " + token
    }
  })

  let message = response.data;
  return message
}

export async function getDashboardApiData(token) {
  const url = `http://ihiapps.com:8080/wildbase/dashboard/admin`;
  let response = await axios.get(url, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const dashboardData = response.data.response;
  console.log(dashboardData);
  return dashboardData;
}