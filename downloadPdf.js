// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet,Button, Text, View , Platform} from 'react-native';
// import * as FileSystem from 'expo-file-system';
// import { shareAsync } from 'expo-sharing';
// // https://github.com/chelseafarley/expo_download_and_save_file/blob/main/App.js
// // import PDFRead from './screens/pdfread';
// import { useState } from 'react';

// export default function App() {

//   const [showpdf, setshowpdf] = useState(false)

//   const downloadFromUrl = async () => {
//     const filename = "small.mp4";
//     const result = await FileSystem.downloadAsync(
//       'http://techslides.com/demos/sample-videos/small.mp4',
//       FileSystem.documentDirectory + filename
//     );
//     console.log(result);

//     save(result.uri, filename, result.headers["Content-Type"]);
//   };

//   const save = async (uri, filename, mimetype) => {
//     if (Platform.OS === "android") {
//       const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
//       if (permissions.granted) {
//         const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
//         await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, mimetype)
//           .then(async (uri) => {
//             await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
//           })
//           .catch(e => console.log(e));
//       } else {
//         shareAsync(uri);
//       }
//     } else {
//       shareAsync(uri);
//     }
//   };

//   // if(showpdf) {
//   //   return (
//   //     <View style={styles.container}>
//   //       <PDFRead />
//   //     </View>
//   //   );
//   // }

//   return (
//     <View style={styles.container}>
//       <Button title="Download From URL" onPress={downloadFromUrl} />
//       <StatusBar style="auto" />
//     </View>
//   );


// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
