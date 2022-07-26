

const Header = () => {
    return (
        <>
            <div className="w-full">
                <div className="max-w-[1350px] w-full mx-auto">
                    <div>
                        <img className="w-[100px]" src={`${process.env.PUBLIC_URL}/images/facetime-logo.png`} alt="" />
                        <h3 className="text-[17px]">Facetime</h3>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header