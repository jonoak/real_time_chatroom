import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import randomName from 'random-name-generator';
import { v4 as uuidv4 } from 'uuid';

  const firebaseConfig = {
    apiKey: "AIzaSyBfrntqfi5tVbyT_hT97WPkT1MXgcQ0e2o",
    authDomain: "coolsupersafespace.firebaseapp.com",
    projectId: "coolsupersafespace",
    storageBucket: "coolsupersafespace.appspot.com",
    messagingSenderId: "989205908042",
    appId: "1:989205908042:web:20d05c7ac4b61819e574b3",
    measurementId: "G-VC486VB4W0"
  };

initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage();

const appElement = document.getElementById('app');
let currentUserName = randomName.generate();

const createChatroom = (chatroomName) => {
    const chatroom = document.createElement('div');
    chatroom.id = 'chatroom';
    chatroom.innerHTML = `
        <div id="messages"></div>
        <div id="message-input">
            <input type="text" id="message" placeholder="Type your message..." maxlength="1000">
            <button id="send-button">Send</button>
        </div>
        <input type="file" id="file-input">
    `;
    appElement.appendChild(chatroom);
    setupMessageListener(chatroomName);
    setupMessageInput(chatroomName);
};

const setupMessageListener = (chatroomName) => {
    const messagesQuery = query(collection(db, chatroomName), orderBy('timestamp'), limit(50));
    onSnapshot(messagesQuery, (querySnapshot) => {
        const messagesElement = document.getElementById('messages');
        messagesElement.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const message = doc.data();
            const messageElement = document.createElement('div');
            messageElement.classList.add('message');
            messageElement.innerHTML = `
                <span class="username">${message.username}:</span>
                <span class="content">${message.content}</span>
                <span class="timestamp">${new Date(message.timestamp.toDate()).toLocaleTimeString()}</span>
            `;
            messagesElement.appendChild(messageElement);
        });
    });
};

const setupMessageInput = (chatroomName) => {
    const messageInput = document.getElementById('message');
    const sendButton = document.getElementById('send-button');
    const fileInput = document.getElementById('file-input');
    let messageCount = 0;
    let lastMessageTime = Date.now();

    sendButton.addEventListener('click', () => {
        const content = messageInput.value;
        if (content && content.length <= 1000 && messageCount < 5 && (Date.now() - lastMessageTime) >= 60000) {
            addDoc(collection(db, chatroomName), {
                username: currentUserName,
                content,
                timestamp: new Date(),
            });
            messageInput.value = '';
            messageCount++;
            if (messageCount === 5) {
                lastMessageTime = Date.now();
                messageCount = 0;
            }
        }
    });

    fileInput.addEventListener('change', async (event) => {
        const file = event.target.files[0];
        if (file && file.size < 15 * 1024 * 1024) {
            const storageRef = ref(storage, uuidv4());
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);
            addDoc(collection(db, chatroomName), {
                username: currentUserName,
                content: `File uploaded: <a href="${downloadURL}" target="_blank">${file.name}</a>`,
                timestamp: new Date(),
            });
            setTimeout(() => deleteObject(storageRef), 15 * 60 * 1000);
            fileInput.value = '';
        }
    });
};

createChatroom('default-chatroom');