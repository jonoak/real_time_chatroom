# Online Chatroom Project
![image](image.jpg)


## Overview
This is an online chatroom project that leverages Firebase for database and storage capabilities. Users can send text messages and upload files, which are then shared with other participants in real-time. The project uses modern JavaScript tools like Webpack and Babel for development and bundling.

## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [Project Structure](#project-structure)
4. [Firebase Configuration](#firebase-configuration)
5. [Development](#development)
6. [Features](#features)
7. [License](#license)

## Installation

### Prerequisites
- Node.js
- npm or yarn

### Steps
1. Clone the repository:
    ```shell
    git clone https://github.com/your-username/online-chatroom.git
    cd online-chatroom
    ```
2. Install the dependencies:
    ```shell
    npm install
    # or if you prefer yarn
    yarn install
    ```
3. Build the project:
    ```shell
    npm run build
    # or if you prefer yarn
    yarn build
    ```

## Usage
1. Start the development server:
    ```shell
    npm start
    # or if you prefer yarn
    yarn start
    ```
2. Open your browser and navigate to `http://localhost:9000` to view the chatroom.

## Project Structure
```
.
├── dist
├── node_modules
├── src
│   ├── index.js
│   ├── random-name-generator.js
├── .babelrc
├── index.html
├── package.json
├── styles.css
├── webpack.config.js
```
- `index.html`: The main HTML file for the project.
- `styles.css`: CSS styles for the chatroom.
- `src/index.js`: Main JavaScript file that initializes Firebase, sets up listeners, and handles user inputs.
- `src/random-name-generator.js`: Utility module to generate random user names.
- `webpack.config.js`: Webpack configuration for bundling the project.
- `.babelrc`: Babel configuration file.

## Firebase Configuration
Before running the project, set up your Firebase project and update the Firebase configuration in `src/index.js`:

```javascript
const firebaseConfig = {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_AUTH_DOMAIN',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_STORAGE_BUCKET',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId: 'YOUR_APP_ID'
};
```
Replace the placeholder values with your actual Firebase project details.

## Development
To develop and test the project locally, use the following commands:
- `npm start` or `yarn start`: Starts the development server on `http://localhost:9000`.
- `npm run build` or `yarn build`: Bundles the project into the `dist` directory.

## Features
- **Real-time Messaging**: Send and receive messages in real-time.
- **File Uploads**: Upload files and share them with other users in the chatroom.
- **User Name Generator**: Automatically generates a random user name for each participant.
- **Message Rate Limiting**: Limits the number of messages a user can send in a minute to prevent spam.
- **Automatic File Deletion**: Uploaded files are automatically deleted from Firebase Storage after 15 minutes.
- **Responsive Design**: The chatroom is responsive and works well on different screen sizes.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.