import { SidebarHeader } from "../ChatBox/Chat"



const User = () => {
    return (
        <>
            <div>
                <div className="h-[130px] max-w-[150px] relative border-2 border-white bg-center bg-cover bg-no-repeat bg-gray-200 rounded-lg">
                </div>
                <p className="">Name</p>
            </div>
        </>
    )
}


const ParticipantBlock = (props) => {
    return (
        <>
            <div className="min-w-[400px] max-w-[400px] bg-[#eef2f8] rounded-3xl p-3 flex flex-col gap-3">
                <SidebarHeader text={'Participants'} />
                <div className="flex-1 overflow-auto">
                    <div className="grid grid-cols-2 gap-3">
                        <User />
                        <User />
                        <User />
                        <User />
                        <User />
                        <User />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ParticipantBlock