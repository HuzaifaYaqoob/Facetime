


const TeamTogether = () => {
    return (
        <>
            <div >
                <div className="max-w-[1500px] my-20 h-full mx-auto flex items-center justify-between gap-4 relative overflow-hidden">
                    <div className="flex-1 relative">
                        <div className="w-[200px] h-[200px] bg-gradient-to-t from-[#FF6A45] to-[#FFA945] rounded-full absolute top-0 right-0">

                        </div>
                        <h3 className="text-8xl text-gray-800 mb-4 relative z-[2]">Bring Your <br />Team Together <br /> in Facetime</h3>
                        <p className="text-[18px] relative z-[2] text-gray-600 mb-4">facetime is the place for everything related to a
                            project, to-do-list or communication.</p>
                        <div className="flex gap-3 items-center">
                            <p className="bg-[#7263F7] cursor-pointer text-white px-4 py-2 rounded-md text-[18px] ">Get Started</p>
                        </div>
                    </div>
                    <div className="flex-1">
                        <img src={`${process.env.PUBLIC_URL}/images/boy.png`} className='z-10 relative -bottom-16 right-28' alt="" />
                    </div>
                    <div className="w-[700px] h-[400px] bg-[#2161FF] absolute bottom-0 right-0 -translate-x-1/2 -skew-x-[25deg] rounded-2xl">

                    </div>
                    <div className="w-[700px] h-[500px] bg-[#8CEAB2] absolute bottom-0 right-0 translate-x-2/3 -skew-x-[25deg] rounded-2xl">

                    </div>
                    <div className="w-[400px] opacity-60 h-[300px] bg-[#44E8FE] absolute bottom-1/2 -translate-x-1/2 right-0  -skew-x-[25deg] rounded-2xl">

                    </div>
                </div>
            </div>
        </>
    )
}

export default TeamTogether