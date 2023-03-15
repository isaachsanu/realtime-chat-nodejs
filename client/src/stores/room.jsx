import { createContext, useContext, useReducer } from "react";

const initialVal = {
    current: "",
    previous: "",
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_ROOM":
            return { previous: state.current, current: action.payload };
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
