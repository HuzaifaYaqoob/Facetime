


const GradientButton = ({ text, border }) => {
    return (
        <>
            <div className={`${border ? 'border border-[#20D9FB]' : 'bg-gradient-to-r from-[#20D9FB] to-[#7263F7]'} px-10 py-3 rounded-md text-[23px] text-white capitalize text-center max-w-max cursor-pointer`}>
                {text}
            </div>
        </>
    )
}

export default {
    GradientButton
}