


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

const ChatInput = () => {
    return (
        <>
            <div className="bg-white px-3 py-2 rounded-lg shadow-lg">
                <div>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.9998 3.99984V11.6665C10.9998 13.1398 9.8065 14.3332 8.33317 14.3332C6.85984 14.3332 5.6665 13.1398 5.6665 11.6665V3.33317C5.6665 2.89114 5.8421 2.46722 6.15466 2.15466C6.46722 1.8421 6.89114 1.6665 7.33317 1.6665C7.7752 1.6665 8.19912 1.8421 8.51168 2.15466C8.82424 2.46722 8.99984 2.89114 8.99984 3.33317V10.3332C8.99984 10.6998 8.69984 10.9998 8.33317 10.9998C7.9665 10.9998 7.6665 10.6998 7.6665 10.3332V3.99984H6.6665V10.3332C6.6665 10.7752 6.8421 11.1991 7.15466 11.5117C7.46722 11.8242 7.89114 11.9998 8.33317 11.9998C8.7752 11.9998 9.19912 11.8242 9.51168 11.5117C9.82424 11.1991 9.99984 10.7752 9.99984 10.3332V3.33317C9.99984 1.85984 8.8065 0.666504 7.33317 0.666504C5.85984 0.666504 4.6665 1.85984 4.6665 3.33317V11.6665C4.6665 13.6932 6.3065 15.3332 8.33317 15.3332C10.3598 15.3332 11.9998 13.6932 11.9998 11.6665V3.99984H10.9998Z" fill="black" />
                    </svg>
                </div>
            </div>
        </>
    )

}


const Chat = () => {
    return (
        <>
            <div className="min-w-[400px] bg-[#eef2f8] rounded-3xl p-3 flex flex-col gap-3">
                <ChatHeader />
                <div className="flex-1 bg-red-200">
                    <ChatMessage />
                    <ChatMessage />
                    <ChatMessage />
                    <ChatMessage />
                    <ChatMessage />
                </div>
                <ChatInput />
            </div>
        </>
    )
}

export default Chat