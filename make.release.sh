cordova  build android --release 
cordova run android --release
adb logcat -c 
adb logcat | grep "Web " 
