import { createContext, useContext, useReducer } from "react";

const initialVal = {
    current: "",
    previous: "",
    available: [
        {id: "room_1", name: "Room 1"},
        {id: "room_2", name: "Room 2"},
        {id: "room_3", name: "Room 3"},
        {id: "room_4", name: "Room 4"},
    ]
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_ROOM":
            console.log('clicked');
            return { ...state, previous: state.current, current: action.payload };
        default:
            return state;
    }
};

export const RoomContext = createContext();
export const useRoom = () => useContext(RoomContext);

export const RoomProvider = ({ children }) => {
    const [value, dispatch] = useReducer(reducer, initialVal);
    return (
        <RoomContext.Provider value={[value, dispatch]}>
            {children}
        </RoomContext.Provider>
    );
};
