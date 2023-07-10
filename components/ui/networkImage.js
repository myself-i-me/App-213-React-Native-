import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import axios from "axios";

const NetworkImage = ({ imageId, token }) => {
  const [base64, setBase64] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbml2aW5kZXJyZWRkeTE2QGdtYWlsLmNvbSIsImlhdCI6MTY4ODgzNzY3OSwiZXhwIjoxNjg4ODQ5Njc5fQ.EmfOQdc5Jb8oPIvtdmMnCO144J-yWjqrT1Y60B0aCvi7iY8a3zVYQcAbf7wocQ4j9wbXNjFBzS1eeueq-wc0Zg");
        
        const imageUri = "http://ihiapps.com:8080/wildbase/downloadFile/flags/" + 'nigeria-flag-icon.svg';
        const response = await fetch(imageUri, {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
          });

        console.log('response is', response);

        const content = await response.text();
        console.log('content is is', response);

        const data =
          "data:image/jpeg;base64," +
          content.substring(1, content.length - 1);
        console.log('data is', data)
        setBase64(data);
      } catch (error) {
        console.error('error in etxhing image is',error);
      }
    };

    fetchImage();
  }, [imageId, token]);

  return <Image style={{ height: 25, width: 40, resizeMode: "cover" }} source={{ uri: base64 }} onError={(err) =>{
    console.log('error in fetching',err)
  }}/>;
};

export default NetworkImage;
