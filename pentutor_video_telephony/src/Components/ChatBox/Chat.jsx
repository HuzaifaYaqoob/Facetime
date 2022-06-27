


import { useState } from "react"
import { connect } from "react-redux"
import ChatMessage from "./ChatMessage"

const ChatHeader = () => {
    return (
        <>
            <div className="p-2 flex items-center justify-between gap-3 mb-4">
                <p className="text-2xl">Chat</p>
                <div className="w-[30px] h-[30px] cursor-pointer rounded-full bg-white shadow-md flex items-center justify-center">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path className="stroke-red-700" d="M11.6667 11.6667L1 1M11.6667 1L1 11.6667" stroke-width="1.33333" stroke-linecap="round" />
                    </svg>
                </div>
            </div>
        </>
    )
}

const ChatInput = (props) => {
    const [inp_value, setInpValue] = useState('')

    const send_chat_message = () => {
        props.onSendMessage(inp_value)
        setInpValue('')
    }
    return (
        <>
            <div
                className="bg-white px-3 py-2 rounded-lg shadow-lg flex items-center gap-2 justify-between"
            >
                <div className="cursor-pointer w-[40px] h-[40px] rounded-md border border-gray-200 flex items-center justify-center">
                    <svg className="rotate-45" width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path className="fill-gray-600" d="M10.9998 3.99984V11.6665C10.9998 13.1398 9.8065 14.3332 8.33317 14.3332C6.85984 14.3332 5.6665 13.1398 5.6665 11.6665V3.33317C5.6665 2.89114 5.8421 2.46722 6.15466 2.15466C6.46722 1.8421 6.89114 1.6665 7.33317 1.6665C7.7752 1.6665 8.19912 1.8421 8.51168 2.15466C8.82424 2.46722 8.99984 2.89114 8.99984 3.33317V10.3332C8.99984 10.6998 8.69984 10.9998 8.33317 10.9998C7.9665 10.9998 7.6665 10.6998 7.6665 10.3332V3.99984H6.6665V10.3332C6.6665 10.7752 6.8421 11.1991 7.15466 11.5117C7.46722 11.8242 7.89114 11.9998 8.33317 11.9998C8.7752 11.9998 9.19912 11.8242 9.51168 11.5117C9.82424 11.1991 9.99984 10.7752 9.99984 10.3332V3.33317C9.99984 1.85984 8.8065 0.666504 7.33317 0.666504C5.85984 0.666504 4.6665 1.85984 4.6665 3.33317V11.6665C4.6665 13.6932 6.3065 15.3332 8.33317 15.3332C10.3598 15.3332 11.9998 13.6932 11.9998 11.6665V3.99984H10.9998Z" />
                    </svg>
                </div>
                <div className="flex-1">
                    <input
                        type="text" placeholder="Enter Message" multiple className="outline-none border-0 p-2"
                        value={inp_value}
                        onChange={(e) => {
                            setInpValue(e.target.value)
                        }}
                        onKeyDown={(e) => {
                            if (e.key == 'Enter') {
                                send_chat_message()
                            }
                        }}
                    />
                </div>
                <div className="cursor-pointer w-[40px] h-[40px] rounded-md bg-indigo-700 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.5593 0.145173C15.6285 0.214505 15.6758 0.302647 15.6954 0.398651C15.7149 0.494654 15.7058 0.594287 15.6693 0.685173L9.85025 15.2322C9.79897 15.3603 9.71334 15.4718 9.60279 15.5543C9.49223 15.6369 9.36103 15.6874 9.22364 15.7002C9.08624 15.713 8.94797 15.6877 8.82405 15.627C8.70012 15.5663 8.59535 15.4726 8.52125 15.3562L5.34325 10.3612L0.348254 7.18317C0.231572 7.10916 0.137605 7.00434 0.0767238 6.8803C0.0158421 6.75626 -0.00958824 6.61781 0.0032389 6.48023C0.016066 6.34264 0.066652 6.21128 0.149415 6.10063C0.232178 5.98998 0.3439 5.90434 0.472254 5.85317L15.0193 0.0361732C15.1101 -0.000414535 15.2098 -0.00949426 15.3058 0.0100619C15.4018 0.0296181 15.4899 0.0769483 15.5593 0.146173V0.145173ZM6.34125 10.0692L9.10225 14.4072L13.8353 2.57517L6.34125 10.0692ZM13.1283 1.86817L1.29625 6.60117L5.63525 9.36117L13.1293 1.86817H13.1283Z" fill="white" />
                    </svg>
                </div>
            </div>
        </>
    )

}

ChatInput.defaultProps = {
    onSendMessage: () => { }
}


const CHt = [
    { first_name: 'Huzaifa', last_name: 'Yaqoob', message: 'Hello hi', created_at: '4 min ago', picture: '' },
    { first_name: 'Huzaifa', last_name: 'Yaqoob', message: 'Hello hi', created_at: '4 min ago', picture: '' },
    { first_name: 'Huzaifa', last_name: 'Yaqoob', message: 'Hello hi', created_at: '4 min ago', picture: '' },
    { first_name: 'Huzaifa', last_name: 'Yaqoob', message: 'Hello hi', created_at: '4 min ago', picture: '' },
    { first_name: 'Huzaifa', last_name: 'Yaqoob', message: 'Hello hi', created_at: '4 min ago', picture: '' },
]

const Chat = (props) => {
    const [chat_messages, setChatMessages] = useState(CHt)
    console.log(props)
    return (
        <>
            <div className="min-w-[400px] max-w-[400px] bg-[#eef2f8] rounded-3xl p-3 flex flex-col gap-3">
                <ChatHeader />
                <div className="flex-1 overflow-auto px-2">
                    {
                        chat_messages.map((msg, index) => {
                            return (
                                <ChatMessage data={msg} key={index} />
                            )
                        })
                    }
                </div>
                <ChatInput
                    onSendMessage={(msg) => {
                        setChatMessages(
                            [
                                ...chat_messages,
                                {
                                    first_name : 'Danish',
                                    last_name : 'Yaqoob',
                                    created_at : 'just now',
                                    message : msg
                                }
                            ]
                        )
                    }}
                />
            </div>
        </>
    )
}


const mapState = (state) =>{
    return state

}

const mapDispatch = {

}

export default connect(mapState , mapDispatch)(Chat)