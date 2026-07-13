# NewCarDrivingHelper
A React Native app that is designed to help new upcoming class C drivers gain a better understanding of the road in California! :D Currently being made with Expo CLI, Flask, Android Studio Emulator, and PostgreSQL! Of course, Claude is being used for the first time here to help aid the development and release of this mobile app.



## How it works:

You write code in VS Code <br>
        ↓<br>
Expo CLI reads your code and translates it <br>
        ↓<br>
Android Studio's emulator displays the result <br>
        ↓<br>
When the app needs data, it asks Flask  <br>
        ↓<br>
Flask fetches it from PostgreSQL and sends it back to the app <br>


# For Developers (Windows OS)

To launch and work on the app you will need to install the latest versions of:

1. Expo CLI v56.1.13
2. Flask 3.13 (with pip and python commands)
3. Android Studio virtual device (pixel 7 w/ API 37)
4. VS Code IDE (latest)
5. Node.js v24.15.0

After this you should have 2 folders one for your "AppName" and one for your "AppName-api"

(I named mine drivewise)

## Steps of Prep to launch app

1. Create your Expo Project 

- Open a brand new powershell window(not the drivewise-api one that uses venv) and create the blank template for the app:

(powershell)
cd C:\Users\mrpri\Desktop
npx create-expo-app drivewise --template blank

2. Open it in VSCode, this is where you make changed to your app!

you could do two ways:

cd drivewise
code .

or
just open the folder in VSCode.


3. Install navigation dependencies(my app will use a navigation bar) in the same PowerShell window run:

npm install @react-navigation/native @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context react-native-svg

4. I now have a nav bar and I also added code to my screens in App.js on VSCode. 

## Finally Launch it

1. To see those changes reflected in your code.Go to Android Studio, but stay on the welcome page with your projects listed below and go to your device manager after clicking the 3 dots.

2. You want to push the play button and have it running. Wait for it to finish google and all the other stuff and you will see it ready. No need to open any projects.


### Run the app
3. You then want to go to your powershell terminal that you are currently using:

C:\Users\USERNAME\Desktop\drivewise

4. Then you want to use the command to run the expo app:

npx expo start

5. If your android emulator is currently ready, then you are free to push 'a' to launch the app. There is a ? mark just to view other commands in that terminal for expo.

### Run the Flask API
cd C:\Users\USERNAME\Desktop\drivewise-api
.\vnv\Scripts\activate
python app.py

6. Voila! You can see the app with the navigation bar and the code you have made.




## Each Tool Explained
React Native 
It's the framework that lets you write JavaScript and have it turn into a real Android app. But the hardware access part (camera, GPS, etc.) is a bonus feature — its main job is just letting you build mobile app screens using JavaScript instead of learning Java or Kotlin (Android's native languages). It's basically a translator between your JavaScript code and Android.
Flask — the missing piece for you 
Great question. Flask hasn't done anything yet because we haven't built it yet — but here's its role. Right now your quiz questions, handbook content, and simulator scenarios don't exist anywhere. Flask is the middleman server that:

Stores and serves your quiz questions to the app
Saves a user's quiz scores to the database
Sends simulator scenarios to the app

Without Flask your app is just pretty screens with no real data. Think of Flask as the waiter in our restaurant analogy — it takes orders from the app and fetches data from the database kitchen.
Expo CLI — this is the secret sauce 🔑
This is a really great question. Android Studio CAN build Android apps but it requires you to write in Java or Kotlin and deal with extremely complex configuration files. Expo lets you:

Write in JavaScript instead
Skip 90% of the complicated Android setup
See changes on your emulator instantly every time you save a file (that live reload is Expo working!)
Eventually package your app for Google Play with one command

So Expo is essentially doing all the hard Android work behind the scenes so you don't have to touch it. Think of it as autopilot for Android development.
Android Studio — just the emulator garage 🏠
You're actually spot on that Android Studio can build apps on its own — but that would require learning a completely different language and workflow. In our setup Android Studio is doing exactly one job — housing the Pixel 7 emulator. That's it. We're not using any of its code editor or build tools. It's like owning a fancy sports car but only using the garage to park your bicycle.
VS Code — your actual workshop 🛠️
Again you're right! And the reason we use VS Code instead of Android Studio's editor comes down to three things:

VS Code has far better JavaScript support
It handles both your React Native code and your Flask Python code in one place
It's lighter, faster, and has better extensions for what we're doing.







7/13/2026
Current state: 

The native code is NOT in plain Expo Go right now because we installed a library to open up our pdf for the driver's handbook.

Meaning, we now need to launch a custom dev client that has react-native-pdf baked in, not with the command called npx expo start, but with:

npx expo run:android

This is now your DEFAULT start the app command every single session going forward. npx expo start is retired for this project. 

