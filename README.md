# Coyote_Carpool
Created by Group I (CSE4550-01)

## Project Description
The Coyote Carpool app will enable CSUSB students to schedule carpooling appointments with each other by matching riders and drivers based on the students’ locations and respective class schedules. An in-app messaging feature will also allow students to communicate prior to their appointment. 
The main element of this React Native Android application is to match CSUSB students who would like to carpool.

## Installation
The project can be run on an emulator via Android Studio, or an APK can be installed and excuted on an Android device.

To install and run on an emulator:
1. Download, unzip, and open the project in Android Studio.
2. Run "npm install" in the root folder, followed by "npm audit fix" if any vulnerabilities are listed.
3. Run "keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000" in the root folder, setting each value to unknown, to generate a new keystore file.
4. Open the emulator and run "npx react-native run-android" in the root folder.

For further details, refer to this project's Maintenance Manual: \[link\]

## Notes
Files ending with \_S are meant for Prototype I testing only; the other screen files are the orginal, fully commented files that will be used in Prototype II.


## Credits
Sophia Sandoval, Nathan Kelly, Ivan Lopez, Isai Ramirez-Lopez, David Vallejo

## License
N/A
