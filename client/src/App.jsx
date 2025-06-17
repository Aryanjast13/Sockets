import { useEffect } from "react";
import { io } from "socket.io-client";
import useMessageStore from "../store/useMessagesStore";

function App() {
  const {message, setMessage,room, setRoom ,JoinRoom, setJoinRoom,socketId, setSocketId ,messages, setMessages} = useMessageStore();
  const socket = io(import.meta.env.VITE_SERVER_URL)
 
 
  
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id);
      setSocketId(socket.id);
    })


    socket.on("recieve-msg", (data) => {
      setMessages( data);
      
    })
    

    return () => {
      socket.disconnect();
    }
  }, [])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { room, message });
    setMessage("")
  
  }
  const handleJoinRoom = (e) => {
    e.preventDefault();
    socket.emit("Room-join",JoinRoom);
    setJoinRoom("")
  
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-purple-100 flex flex-col items-center py-10">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col">
        <h1 className="text-4xl font-extrabold text-center text-green-700 mb-2">Welcome to Chat App</h1>
        <h2 className="text-lg text-center text-gray-500 mb-6">Your Socket ID: <span className="font-mono text-red-500">{socketId}</span></h2>
        <form className="flex gap-2 mb-6" onSubmit={handleJoinRoom}>
          <input
            type="text"
            placeholder="Enter room name"
            className="flex-1 px-3 py-2 rounded-l border border-fuchsia-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-300 bg-fuchsia-50"
            value={JoinRoom}
            onChange={(e) => setJoinRoom(e.target.value)}
          />
          <button
            type="submit"
            className="bg-fuchsia-700 hover:bg-fuchsia-800 transition py-2 px-5 rounded-r text-lg font-semibold text-white"
          >
            Join
          </button>
        </form>
        <div className="h-64 overflow-y-auto bg-gray-50 rounded-lg shadow-inner p-4 flex flex-col-reverse gap-2 mb-6">
          {messages.length === 0 ? (
            <div className="text-center text-gray-400">No messages yet.</div>
          ) : (
            [...messages].reverse().map((m, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded px-3 py-2 shadow-sm text-gray-800"
              >
                {m.message}
              </div>
            ))
          )}
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Room"
            className="flex-1 px-3 py-2 rounded-l border border-green-400 focus:outline-none focus:ring-2 focus:ring-green-300 bg-green-50"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <input
            type="text"
            placeholder="Type your message"
            className="flex-1 px-3 py-2 border-t border-b border-green-400 focus:outline-none focus:ring-2 focus:ring-green-300 bg-green-50"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 transition py-2 px-5 rounded-r text-lg font-semibold text-white"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default App
