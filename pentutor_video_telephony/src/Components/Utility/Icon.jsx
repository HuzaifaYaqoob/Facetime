

const MenuIcon = ({ text, color, icon, onClick }) => {
    return (
        <>
            <div>
                <div
                    className="rounded-full w-[55px] h-[55px] bg-white shadow-lg mb-2 cursor-pointer flex items-center justify-center"
                    onClick={onClick}
                >
                    {icon}
                </div>
                <span className="block text-center capitalize">{text}</span>
            </div>
        </>
    )
}


MenuIcon.defaultProps = {
    text: '',
    color: 'text-gray-900',
    onClick: () => { }
}

export default MenuIcon