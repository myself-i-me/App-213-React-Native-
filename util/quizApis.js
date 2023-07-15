import axios from 'axios';

export async function getAvailabaleQuizzessByDocumentId(documentId,token) {
    const url = `http://ihiapps.com:8080/wildbase/api/quizmaster/get/bydocumentid?documentId=${documentId}`;
    let response = await axios.get(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
    });
    let availableQuizzes = response.data.response.data;
    console.log('aavailable quizzes are', availableQuizzes);
    return availableQuizzes;
}