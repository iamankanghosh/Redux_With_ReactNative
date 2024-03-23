import { PermissionsAndroid } from 'react-native';
import RNFS from 'react-native-fs';

export const saveLog = (message) => {
    const requestStoragePermission = async (message) => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'App needs access to your storage to save files.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Storage permission granted');
          saveLogFile(message);
        } else {
          console.log('Storage permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };
  
    const saveLogFile = async (message) => {
      try {
        const customFolderPath = RNFS.ExternalDirectoryPath + '/customFolder';
        await RNFS.mkdir(customFolderPath);
        const filePath = customFolderPath + '/log.txt';
        const fileExists = await RNFS.exists(filePath);
        let content;
        if (fileExists) {
            content = await RNFS.readFile(filePath, 'utf8');
            console.log("------------------------------------------------------------------");
            console.log(content);
            console.log("------------------------------------------------------------------");
        }
        await RNFS.appendFile(filePath, message+'\n' , 'utf8');
        console.log('Log appended to file:', filePath);
      } catch (error) {
        console.error('Error writing to log file:', error.message);
      }
    };
  

    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
    .then((result) => {
      if (result) {
        console.log('Storage permission already granted');
        saveLogFile(message);
      } else {
        console.log('Storage permission not granted, requesting...');
        requestStoragePermission(message);
      }
    })
    .catch((error) => {
      console.warn('Error checking storage permission:', error);
    });
  

};
