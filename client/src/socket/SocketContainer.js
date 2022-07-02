import { useEffect } from 'react';
import { Socket } from "phoenix";

const SocketContainer = props => {

    useEffect(() => {
        async function joinSocket() {
            if (!props.socketRef) {
                let socket = new Socket("/socket", {params: {token: window.userToken}})
                socket.connect()
                console.log(socket);
                // Now that you are connected, you can join channels with a topic.
                // Let's assume you have a channel with a topic named `room` and the
                // subtopic is its id - in this case 42:
                const roomId = parseInt(Math.random()*100000, 10);
                let channel = socket.channel("room:lobby", {})
                console.log("Attempting connection")
                let s = await channel.join();
                s.receive("ok", resp => { console.log("Joined successfully", resp) })
                .receive("error", resp => { console.log("Unable to join", resp) });
                console.log(s);
                socket.leadRoom = roomId;
                props.setSocketRef(socket);
            }
        }
        joinSocket();
    }, [props.socketRef]);

    return <div></div>
}

export default SocketContainer;