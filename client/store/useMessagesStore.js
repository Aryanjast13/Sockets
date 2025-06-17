import { create } from "zustand";


 const useMessageStore = create((set) => ({
     messages: [],
     message: "",
     room: "",
     JoinRoom: "",
     socketId:"",
     setMessages: (data) => {
         set((state) => ({
             messages: [...state.messages, data]
         }));
     },
     setMessage: (data) => {
         set({message:data})
     },
     setRoom: (data) => {
         set({ room: data });
     },
     setJoinRoom: (data) => {
         set({ JoinRoom: data });
     },
     setSocketId: (data) => {
         set({socketId:data})
     }
     
 }));



export default useMessageStore;



