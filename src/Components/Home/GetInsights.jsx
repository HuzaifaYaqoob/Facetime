



const GetInsighntsSection = () => {
    return (
        <>
            <div className="py-16">
                <div className="max-w-[1400px] my-20 h-full mx-auto flex items-center justify-between gap-4 relative overflow-hidden">
                    <div className="flex-1">
                        <h3 className="text-8xl font-bold text-gray-800 mb-4 relative z-[2]">Get insights <br/>with video <br /> interviews</h3>
                        <p className="text-[18px] relative z-[2] text-gray-600 mb-4">Target all your clients during key moments throughout <br /> their product journey</p>
                        <div className="flex gap-3 items-center">
                            <p className="bg-[#7263F7] cursor-pointer text-white px-4 py-2 rounded-md text-[18px] ">Start for Free</p>
                            <p className="cursor-pointer">Talk to Sale</p>
                        </div>
                    </div>
                    <div className="flex-1">
                        <img src={`${process.env.PUBLIC_URL}/images/girlimage.png`} className='z-10 relative' alt="" />
                    </div>
                    <div className="bg-[#91B0F4] z-0 absolute bottom-0 -right-1/3 w-[1000px] h-[180px] rounded-full rotate-45">

                    </div>
                    <div className="bg-[#9F82DC] z-0 absolute bottom-0 -right-[150px] w-[1200px] h-[180px] rounded-full rotate-45">

                    </div>
                </div>
            </div>
        </>
    )
}

export default GetInsighntsSection