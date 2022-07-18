

const MenuIcon = ({ text, color, icon, onClick, active, className, badge }) => {
    return (
        <>
            <div className={`${className && className}`}>
                <div
                    className={`rounded-full relative mx-auto w-[35px] h-[35px] md:w-[55px] md:h-[55px] ${active ? 'bg-white' : 'bg-red-600'} shadow-lg md:mb-2 cursor-pointer flex items-center justify-center`}
                    onClick={onClick}
                >
                    {icon}
                    {
                        badge &&
                        <span className="block w-[5px] h-[5px] rounded-full bg-orange-400 absolute top-1 right-1"></span>
                    }
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
    active: true,
    badge: false,
}

export default MenuIcon