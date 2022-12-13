# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


# Nodogoro Chat

## Project Description

This is a serverless chat application built using React.js, TypeScript, MUI and Firebase services e.g. Firestore DB, Firebase Auth using Google Auth, Firebase Functions.

## How it works

- When you first visit the project, you are prompted with a sign in page that asks you to login with your google account.
- Once logged in you can send messages and read messages on the spot as it's working in realtime
- There's the basic rules of conduct against hate speech and cussing so if you type a message that might be inappropriate you will be banned and logged out immediately, however the ban only lasts for 48 hours then you should be able to login again.
- Chat messages older than 72 hours will be deleted periodically
- the chat room can only contain 4 users at a time, this feature is a bit clancy a bit but working fine at the moment, with the caveat of user being logged out on page refresh.


## Code Structure

There are two main folders in the main directory:
- src:
  - it contains every thing related to our react application.
- functions:
  - it contains the serverless functions that manage some DB functionality, like the banning and un-banning functionality, the clear old messages functionality ..etc.

## Functionality
as mentioned above the functions direcotry contains the Firebase serverless functions, these functions are:
- addUserToDB:
  used on a new user signin "first time" to add that user to the users table in the database.
- detectBadWords:
  used on every new message as a profanity check to detect bad messages and ban users
- removeBannedUsersScheduler:
  a schedular function that runs every 24 hours to remove ban from users who have been banned for 48 hours.
- clearMessagesSchedular:
  another schedular function that runs every 24 hours to remove messages that have been sent over 72 hours ago in order to keep our DB small in scale.
  
   

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
