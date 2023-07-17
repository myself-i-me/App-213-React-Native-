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

export async function getStatistics(token) {
  const url = `http://ihiapps.com:8080/wildbase/dashboard/chart/data`;
  let response = await axios.get(url,{
    headers:{
      Authorization: "Bearer " + token
    }
  })
  return response.data.response.data
}

export async function changeUserStatus(userId,status,token) {
  const url = `http://ihiapps.com:8080/wildbase/users/status/update/${userId}?status=${status}`
  let response = await axios.patch(url,{},{
    headers : {Authorization:"Bearer "+token},
  })
  return response.data;
}

export async function approveDocumentRequest(token) {
  const url = `http://ihiapps.com:8080/wildbase/documents/approve/request`;
  let response = await axios.post(url,{
    "createdBy": "string",
    "createdDate": "2023-07-16T06:14:24.137Z",
    "lastModifiedBy": "string",
    "lastModifiedDate": "2023-07-16T06:14:24.137Z",
    "id": 16,
    "userId": 1,
    "documentId": 0,
    "requestedDateTime": "2023-07-16T06:14:24.137Z",
    "requestReason": "string",
    "appoved": true,
    "approvedBy": "string",
    "approvedon": "2023-07-16T06:14:24.137Z",
    "status": "string",
  })
}