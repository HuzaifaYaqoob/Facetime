import { useEffect } from "react";



const Homepage = (props) => {

    useEffect(()=>{

        let socket = new WebSocket('ws://192.168.238.107:8000/ws/video-chat/hello/')
        socket.onopen = (e) =>{
            console.log(e)
        }
        socket.onmessage = (e) =>{
            console.log(e)
        }
        socket.onclose = (e) =>{
            console.log(e)
        }
    } , [])
    return (
        <>
            this is home page
        </>
    )
}


export default Homepage;