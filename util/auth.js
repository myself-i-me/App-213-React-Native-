import axios from "axios";

export async function createUser(firstName,lastName,email,password,confirmPassword,countryCode,languagepreferences,role) {
  const url = `http://ihiapps.com:8080/wildbase/auth/signup`;
  let response = await axios.post(url,{
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    confirmPassword: confirmPassword,
    country: countryCode,
    languagePreferences: languagepreferences,
    role: role,
    termsAndConditions: true,
    additionalRole: "ROLE_USER"
  })
  console.log('resp is', response)
  return true
}

export async function sendOtp(email){
  const url = `http://ihiapps.com:8080/wildbase/auth/send/otp?userName=${email}`
  let otp = await axios.post(url);
  console.log('otp is', otp)
  return true;
}

export async function login(email, password) {
  const url = `http://ihiapps.com:8080/wildbase/auth/signin`;
  console.log(email, password);
  let response;
  response = await axios.post(url, {
    username: email,
    password: password,
  })
  console.log(
    "response is",
    response,
    "::::::::::::::::::::::::::::::::::::::::::;"
  );
  const token = response?.data?.response.token;
  const refreshToken = response?.data?.response.refreshToken;
  console.log("response is", response?.data?.response?.profile);
  const userId = String(response?.data?.response?.profile?.id);
  const role = response?.data?.response?.profile?.authorities[0]?.authority;
  return { token, refreshToken, userId, role };
}

export async function refreshTokenFunction(refreshToken) {
  const url = 'http://ihiapps.com:8080/wildbase/auth/refreshtoken';
  let response = await axios.post(url,{
    refreshToken: refreshToken
  });
  let newToken = response.data.accessToken;
  let newRefreshToken = response.data.refreshToken;

  console.log({newToken, newRefreshToken}, '@@@@@')
  return {newToken, newRefreshToken}
}

export async function validateOtpFunction(otp,usernName) {
  const url = `http://ihiapps.com:8080/wildbase/auth/otp/validate?OTP=${otp}&userName=${usernName}`;
  let response = await axios.post(url);
  return response;
}

export async function forgotPasswordFunction(userName) {
  const url = `http://ihiapps.com:8080/wildbase/auth/forgot-password?email=${userName}`;
  let response = await axios.post(url)
  return response;
}

export async function changePasswordApi(userId, oldPassword, newPassword, confirmPassword, token) {
  const url = `http://ihiapps.com:8080/wildbase/auth/user/change-password`;
  let response = await axios.post(url,{
    userId:userId,
    oldPassword: oldPassword,
    password: newPassword,
    confirmPassword: confirmPassword
  },{
    headers:{
      Authorization: "Bearer " + token
    }
  })
  return response.data
}

export async function resetPasswordApi(otp,password) {
  const url = `http://ihiapps.com:8080/wildbase/auth/reset-password?OTP=${otp}&password=${password}`;
  const response = await axios.put(url);
  let msg = response.data.message;
  console.log('msg is', msg)
}