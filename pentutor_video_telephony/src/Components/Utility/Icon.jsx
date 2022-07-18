

const MenuIcon = ({ text, color, icon, onClick, active, className }) => {
    return (
        <>
            <div className={`${className && className}`}>
                <div
                    className={`rounded-full mx-auto w-[35px] h-[35px] md:w-[55px] md:h-[55px] ${active ? 'bg-white' : 'bg-red-600'} shadow-lg md:mb-2 cursor-pointer flex items-center justify-center`}
                    onClick={onClick}
                >
                    {icon}
                </div>
                <span className={`text-center capitalize text-xs md:text-md md:block hidden`}>{text}</span>
            </div>
        </>
    )
}


MenuIcon.defaultProps = {
    text: '',
    color: 'text-gray-900',
    onClick: () => { },
    active: true
}

export default MenuIcon