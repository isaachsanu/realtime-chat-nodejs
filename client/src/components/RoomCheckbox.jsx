import { useRoom } from "../stores/room";

export default function RoomCheckbox(param) {
    const [room, dispatch] = useRoom();

    return (
        <div className="px-4 py-2 cursor-pointer" onClick={() => dispatch({ type: "SET_ROOM", payload: param.id })}>
            <div className={"px-8 py-4 rounded-xl " + ((room.current==param.id) ? "bg-blue-200" : "bg-gray-200")}>
                {param.name}
            </div>
        </div>
    )
}