import axios from "axios";

export async function getDocumentsByUserID(userId, token) {
  const url = `http://ihiapps.com:8080/wildbase/documents/list/byuser?userId=${userId}`;
  console.log('2nd time', userId,token)
  let response =await axios.get(url, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const docsArray = response?.data?.response?.data;
  // console.log('docsarray is', docsArray)
  return docsArray;
}

export async function getCountries() {
  let response = await  axios.get("http://ihiapps.com:8080/wildbase/countries/list");
  let countries = response?.data?.response?.data;
  return countries;
}

export async function sendRequestAccess(userId,documentId,requestReason, token) {
  const url = `http://ihiapps.com:8080/wildbase/documents/send/approve/request`;
  let response = await axios.post(url,{
    userId: userId,
    documentId: documentId,
    requestDateTime: new Date(),
    requestReason: requestReason,
    status: 'pending'
  },{
    headers:{
      Authorization: "Bearer " + token
    }
  })

  console.log('response is ', response?.data.message)
  return response.data.message
}