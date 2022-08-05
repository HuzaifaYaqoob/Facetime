

import Svgs from "../Utility/Svgs"

const NavItem = ({ text, arrow, sp_btn }) => {
    return (
        <>
            <li className={`text-white flex items-center gap-2 cursor-pointer capitalize text-[19px] py-2 px-6 rounded-md ${sp_btn && 'bg-[#7263F7]'}`}>
                {text}
                {
                    arrow &&
                    <Svgs.ArrowDownIcon />
                }
            </li>
        </>
    )
}


NavItem.defaultProps = {
    text: '',
    arrow: false,
    sp_btn: false
}

const Header = () => {
    return (
        <>
            <header className="w-full bg-[#011931] z-20 fixed top-0 backdrop-blur-md">
                <div className="max-w-[1350px] py-4 w-full mx-auto h-[full] flex items-center justify-between">
                    <div>
                        <img className="w-[70px] cursor-pointer" src={`${process.env.PUBLIC_URL}/images/facetime-logo.png`} alt="" />
                    </div>
                    <div>
                        <ul className="flex items-center gap-1">
                            <NavItem text='home' />
                            <NavItem text='Solutions' arrow />
                            <NavItem text='pricing' />
                            <NavItem text='support' />
                            <NavItem text='signin' />
                            <NavItem text='singup' sp_btn />
                        </ul>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header