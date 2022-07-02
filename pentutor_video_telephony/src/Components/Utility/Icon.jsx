

const MenuIcon = ({ text, color, icon, onClick, active }) => {
    return (
        <>
            <div>
                <div
                    className={`rounded-full mx-auto w-[55px] h-[55px] ${active ? 'bg-white' : 'bg-red-600'} shadow-lg mb-2 cursor-pointer flex items-center justify-center`}
                    onClick={onClick}
                >
                    {icon}
                </div>
                <span className={`block text-center capitalize`}>{text}</span>
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