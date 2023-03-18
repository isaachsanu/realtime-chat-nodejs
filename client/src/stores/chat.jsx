import { createContext, useContext, useReducer } from "react";

const initialVal = {
    chatByRoom: {}
};

const reducer = (state, action) => {
    switch (action.type) {
        case "INIT_CHAT_ROOM":
            var new_chatByRoomState = state.chatByRoom;
            new_chatByRoomState[action.payload] = [];
            return { ...state, chatByRoom: new_chatByRoomState };
        case "RECEIVE_MESSAGE":
            var new_chatByRoomState = state.chatByRoom;
            new_chatByRoomState[action.payload.room] = [...new_chatByRoomState[action.payload.room], action.payload];
            console.log(new_chatByRoomState[action.payload.room]);
            return { ...state, chatByRoom: new_chatByRoomState };
        default:
            return state;
    }
};

export const ChatContext = createContext();
export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
    const [value, dispatch] = useReducer(reducer, initialVal);
    return (
        <ChatContext.Provider value={[value, dispatch]}>
            {children}
        </ChatContext.Provider>
    );
};
