import { useState, useEffect } from 'react';
import SocketContainer from '../socket/SocketContainer.js';
import Prompt from './Prompt.js';
import BurritoBuilder from './Builder/BurritoBuilder.js';
import { addIngredient } from '../utility/burrito.js';
import './Container.css';
import { BAD_STATES } from '../utility/flags.js';

const Container = props => {
    const [message, setMessage] = useState(null);
    const [prompt, setPrompt] = useState(null);
    // const [socket, setSocket] = useState(-1);
    const [busy, setBusy] = useState(false);
    const [burrito, setBurrito] = useState(null);
    const [socketRef, setSocketRef] = useState(null);
    const [error, setError] = useState(null);
    
    // useEffect(() => {
    //     if (socket === -1) {
    //         // Setting random socket for communication for jobs. In production, using a socket provided from server based on user id would be a superior method
    //         let s = Math.random() *10000000;
    //         setSocket(parseInt(s, 10));
    //     }
    // }, [socket]);
    
    useEffect(() => {
        if (socketRef && !message && !busy) {
            setBusy(true);
            fetch('/index', {
            method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ socket: socketRef.leadRoom })
            })
            .then((x) => {
                console.log({ x });
                return x.json();
            })
            .then((res) => {
                setMessage(res.burritos);
                if (res.prompt) {
                    setPrompt(res.prompt);
                }
                setBusy(false);
                return;
            })
            .catch((err) => {
                setBusy(false);
            });
        }
    }, [busy, setMessage, socketRef]);
    
    return <div>
        <div className={`leadContainer`}>
            <SocketContainer setSocketRef={setSocketRef}></SocketContainer>
            <Prompt message={message} 
            prompt={prompt} 
            doAddIngredient={async () => {
                if (!burrito && !busy) {
                    setBusy(true);
                    setError(null);
                    let d = await addIngredient(socketRef.leadRoom, "Tortilla", burrito);
                    if (d) {
                        if (BAD_STATES.indexOf(d.status) > -1 || !d.ingredient) {
                            setError("Issue starting Burrito. Please contact us at 000-000-0000");
                        } else {
                            setBurrito({
                                created: d.time ? d.time : null,
                                burrito: [d.ingredient]
                            });
                            setMessage("Build your Burrito Below!");
                            setPrompt(null);
                        }
                        setBusy(false);
                    }
                }
            }}></Prompt>
            <BurritoBuilder socketRef={socketRef} error={error} setError={setError} burrito={burrito} setBurrito={setBurrito} setBusy={setBusy} busy={busy} setMessage={setMessage} setPrompt={setPrompt}></BurritoBuilder>
        </div>
    </div>;      
}

export default Container;