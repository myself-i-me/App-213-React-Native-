// import React, { useEffect, useState } from "react";
// import { View, Button, Text } from "react-native";
// // import { WebView } from "react-native-webview";
// import * as FileSystem from "expo-file-system";
// import * as SecureStore from "expo-secure-store";

// export default function ToDownloads() {
//   const [pdfUri, setPdfUri] = useState(null);

//   //   useEffect(() => {
//   //     const retrievePdfUri = async () => {
//   //       const storedPdfUri = await SecureStore.getItemAsync("pdfUri");
//   //       console.log('came here')
//   //       if (storedPdfUri) {
//   //         setPdfUri(storedPdfUri);
//   //       }
//   //     };

//   //     retrievePdfUri();
//   //   }, []);

//   const retrieveFile = async () => {
//     const documentsDirectory = FileSystem.cacheDirectory;

//     try {
//       const documents = await FileSystem.readDirectoryAsync(documentsDirectory);
//       console.log("Documents:", documents);
//     } catch (error) {
//       console.log("Error fetching documents:", error);
//     }
//   };

//   return (
//     <View style={{ flex: 1, alignItems:'center', justifyContent:'center' }}>
//       <Text
//         onPress={retrieveFile}
//         style={{
//           textDecorationLine: "underline",
//           color: "red",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         Show documents 
//       </Text>
//     </View>
//   );
// }
