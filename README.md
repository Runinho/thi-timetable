# thi-timetable
*This is not an **official** Project/App/Webseite of the Technical University Ingolstad (Technische Hochschule Ingolstadt).*

Progressiv Web App build with React providing the core functionality of the offical THI App, but **good**.

A Hosted version of the site can be found [here](thi-app.frohn.cologne).

<p align="center">
  <img height="400" src="https://i.imgur.com/gDa79SQ.png"><br/>
  Overview page with a canceled class.
</p>

## Goal
The offical App is slow, unreliable and instable.
Goal of this project is a fast, relibale and stable Progressiv Web App.
Features are less important than a good user experience.

## Install
You’ll need to have Node >= 6

1. Clone the project.
2. Install dependecys.
```
npm install
```
3. Start the development server.
```
npm start
```

The project was created with [create-react-app](https://github.com/facebook/create-react-app).

## Why does the Website have to send data to the server?
Browsers does not allow Cross Origin Requests. Requests to [https://www3.primuss.de/stpl/login.php](https://www3.primuss.de/stpl/login.php) need to be proxyed or CORS localy enabled in the browser. For more information see: [developer.mozilla.org/en-US/docs/Web/HTTP/CORS](https://www3.primuss.de/stpl/login.php)
