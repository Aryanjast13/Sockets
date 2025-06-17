# React + Vite + Socket.IO Chat App

This project is a simple real-time chat application built with React, Vite, and Socket.IO. It demonstrates how to use Socket.IO for real-time communication between a client and server, including connecting, emitting events, handling disconnects, and working with chat rooms.

## Features

- **Real-time Messaging:** Send and receive messages instantly between connected clients.
- **Room Support:** Join specific chat rooms and send messages to users in the same room.
- **Connection Events:** Learn how to handle user connections and disconnections.
- **State Management:** Uses Zustand for managing chat messages on the client.

## What I Learned

- **Connection Events:**  
  Using `io.on("connection", ...)` on the server and `socket.on("connect", ...)` on the client to detect when users connect and assign them unique socket IDs.

- **Emitting and Listening for Events:**  
  Using `socket.emit(event, data)` to send events and `socket.on(event, callback)` to listen for events, enabling real-time message exchange.

- **Disconnect Events:**  
  Handling `disconnect` events to know when a user leaves and to perform cleanup or logging.

- **Room Events:**  
  Using `socket.join(room)` on the server and emitting a `"Room-join"` event from the client to allow users to join specific chat rooms. Messages can then be sent to all users in a room using `io.to(room).emit(...)`.

## How to Run

### Server

1. Navigate to the `server` directory:
  ```sh
  cd server
  ```
2. Install dependencies:
  ```sh
  npm install
  ```
3. Start the server:
  ```sh
  npm run dev
  ```
  The server will typically run on `http://localhost:3000` (or as configured).

### Client

1. Open a new terminal and navigate to the `client` directory:
  ```sh
  cd client
  ```
2. Install dependencies:
  ```sh
  npm install
  ```
3. Start the client:
  ```sh
  npm run dev
  ```
  The client will usually be available at `http://localhost:5173` (or as configured).

## Usage

- Open the client URL in your browser.
- Enter a username and room to join.
- Start chatting in real time with others in the same room.

## Requirements

- Node.js (v16 or higher recommended)
- npm

## License

This project is licensed under the MIT License.