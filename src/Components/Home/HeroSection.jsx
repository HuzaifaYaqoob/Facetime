

import Form from "../Utility/Form"


const HeroSection = () => {
    return (
        <>
            <div className="min-h-screen bg-[#011931] relative flex items-center ">
                <div className="max-w-[1600px] w-full mx-auto flex items-center gap-10 justify-between">
                    <div className="flex-1 relative">
                        <h1 className="text-7xl font-bold text-white mb-7 z-[2] relative">The Ultimate Communication platform</h1>
                        <p className="text-[20px] text-gray-300 mb-10 z-[2] relative">Keep the workflow going by centralizing all your tools
                            and touchpoints in one platforms Make for team
                            collaboration, DevOps and Customer engagement</p>
                        <div className="flex items-center gap-5 z-[2] relative">
                            <Form.GradientButton text='Request a demo' />
                            <Form.GradientButton text='join us' border />
                        </div>
                        <h1 className="z-[1] text-[115px] stroke-text absolute whitespace-nowrap top-1/2 -left-[100px] -translate-y-1/2 font-bold text-transparent mb-7">The Ultimate <br /> Communication<br /> platform<br />A Product By RedExpo</h1>
                    </div>
                    <div className="flex-1 relative">
                        <img className="rotate-12 skew-x-12 scale-125 max-w-[800px]" src={`${process.env.PUBLIC_URL}/images/ChatRoomLandingPage.jpg`} alt="" />
                    </div>
                </div>
                <div className="absolute bottom-9 left-1/2 -translate-x-1/2 animate-bounce">
                    <svg width="30" height="39" viewBox="0 0 30 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.338946 22.3567C0.446116 22.2436 0.573429 22.1539 0.713594 22.0927C0.853758 22.0315 1.00402 22 1.15577 22C1.30753 22 1.45779 22.0315 1.59795 22.0927C1.73812 22.1539 1.86543 22.2436 1.9726 22.3567L15.0003 36.0673L28.028 22.3567C28.2446 22.1287 28.5385 22.0006 28.8448 22.0006C29.1512 22.0006 29.445 22.1287 29.6617 22.3567C29.8783 22.5846 30 22.8938 30 23.2161C30 23.5385 29.8783 23.8477 29.6617 24.0756L15.8171 38.6433C15.71 38.7564 15.5826 38.8461 15.4425 38.9073C15.3023 38.9685 15.1521 39 15.0003 39C14.8485 39 14.6983 38.9685 14.5581 38.9073C14.418 38.8461 14.2906 38.7564 14.1835 38.6433L0.338946 24.0756C0.231505 23.9629 0.146262 23.8289 0.0881004 23.6814C0.0299385 23.5339 0 23.3758 0 23.2161C0 23.0565 0.0299385 22.8984 0.0881004 22.7509C0.146262 22.6034 0.231505 22.4694 0.338946 22.3567V22.3567Z" fill="#F8F8F8" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.29375 14.3147C2.38663 14.2149 2.49697 14.1358 2.61845 14.0818C2.73992 14.0278 2.87015 14 3.00167 14C3.13319 14 3.26342 14.0278 3.38489 14.0818C3.50637 14.1358 3.61671 14.2149 3.70959 14.3147L15.0003 26.4123L26.2909 14.3147C26.3839 14.2151 26.4943 14.1361 26.6157 14.0822C26.7372 14.0283 26.8674 14.0006 26.9989 14.0006C27.1303 14.0006 27.2605 14.0283 27.382 14.0822C27.5034 14.1361 27.6138 14.2151 27.7068 14.3147C27.7997 14.4143 27.8735 14.5325 27.9238 14.6626C27.9741 14.7928 28 14.9322 28 15.0731C28 15.2139 27.9741 15.3534 27.9238 15.4835C27.8735 15.6136 27.7997 15.7319 27.7068 15.8314L15.7082 28.6853C15.6153 28.7851 15.505 28.8642 15.3835 28.9182C15.262 28.9722 15.1318 29 15.0003 29C14.8687 29 14.7385 28.9722 14.617 28.9182C14.4956 28.8642 14.3852 28.7851 14.2923 28.6853L2.29375 15.8314C2.20064 15.7319 2.12676 15.6137 2.07635 15.4836C2.02595 15.3535 2 15.214 2 15.0731C2 14.9322 2.02595 14.7927 2.07635 14.6625C2.12676 14.5324 2.20064 14.4142 2.29375 14.3147V14.3147Z" fill="#F8F8F8" fill-opacity="0.8" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.24856 7.27273C4.32715 7.18628 4.42051 7.11769 4.5233 7.07089C4.62609 7.02409 4.73628 7 4.84757 7C4.95885 7 5.06904 7.02409 5.17183 7.07089C5.27462 7.11769 5.36798 7.18628 5.44657 7.27273L15.0002 17.7573L24.5539 7.27273C24.7127 7.09842 24.9282 7.00049 25.1529 7.00049C25.3775 7.00049 25.593 7.09842 25.7519 7.27273C25.9108 7.44705 26 7.68347 26 7.92999C26 8.17651 25.9108 8.41294 25.7519 8.58725L15.5992 19.7273C15.5206 19.8137 15.4273 19.8823 15.3245 19.9291C15.2217 19.9759 15.1115 20 15.0002 20C14.8889 20 14.7787 19.9759 14.676 19.9291C14.5732 19.8823 14.4798 19.8137 14.4012 19.7273L4.24856 8.58725C4.16977 8.50102 4.10726 8.39858 4.06461 8.28579C4.02195 8.17301 4 8.0521 4 7.92999C4 7.80789 4.02195 7.68698 4.06461 7.57419C4.10726 7.46141 4.16977 7.35897 4.24856 7.27273V7.27273Z" fill="#F8F8F8" fill-opacity="0.58" />
                       </svg>
                </div>
            </div>
        </>
    )
}

export default HeroSection