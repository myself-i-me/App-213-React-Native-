import axios from 'axios';

export async function getAvailabaleQuizzessByDocumentId(documentId,token) {
    const url = `http://ihiapps.com:8080/wildbase/api/quizmaster/get/bydocumentid?documentId=${documentId}`;
    let response = await axios.get(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
    });
    let availableQuizzes = response.data.response.data;
    return availableQuizzes;
}


export async function generateQuiz(quizId,userId,token) {
  let currentTime = new Date();
  const url = `http://ihiapps.com:8080/wildbase/api/quiz/generate`
  const response = await axios.post(url,{
    userId: userId,
    quizMasterId: quizId,
    startTime: currentTime
  },{
    headers: {
      Authorization: "Bearer " + token,
    }
  })
  let questions = response.data.response.data;
  return questions
}


export async function FinalSubmit(quizId,questions,token) {
  console.log('before api!>>>>>>>>>>>>>>', quizId,questions,token)
  let currentTime = new Date();
  const url = `http://ihiapps.com:8080/wildbase/api/quiz/final/submit`;
  const response = await axios.post(url,{
    endTime: currentTime,
    quizId: quizId,
    questions:questions,
  },{
    headers: {
      Authorization: "Bearer " + token,
    }
  })

  console.log('final submit response is', response.data.response.data);
  return response.data.response.data;
}