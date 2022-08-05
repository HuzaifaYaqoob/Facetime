import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { get_user } from "../../redux/actions/Auth";
import Cookies from 'js-cookie'
import { createNewVideoMeeting } from "../../redux/actions/Video";
import { Triangle } from "react-loader-spinner";
import Header from "../../Components/Header/Header";
import HeroSection from "../../Components/Home/HeroSection";


const Homepage = (props) => {
    const loading_size = 80
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [url, setUrl] = useState()
    const [login_loading, setLoginLoading] = useState(true)

    const get_user_handler = () => {
        props.get_user(
            {},
            () => {
                setLoginLoading(false)
            },
            () => {
                setLoginLoading(false)
            }
        )
    }

    const new_meeting_handler = () => {
        dispatch({
            type: 'LOADER',
            payload: true
        })
        props.createNewVideoMeeting(
            {},
            (result) => {
                dispatch({
                    type: 'LOADER',
                    payload: false
                })
                navigate(`/${result.id}`)
            },
            () => {
                dispatch({
                    type: 'LOADER',
                    payload: false
                })
                dispatch({
                    type: 'ADD_OR_REMOVE_SNACK_BAR',
                    payload: {
                        message: 'Something went wrong while creating new meeting',
                        type: 'info'
                    }
                })
            }
        )
    }

    useEffect(() => {
        if (Cookies.get('auth_token')) {
            get_user_handler()
        }
        else {
            setLoginLoading(false)
        }

    }, [])
    return (
        <>
            <Header />
            <HeroSection />
            <div className="flex items-center p-3 sm:p-0 justify-center md:justify-between flex-col md:flex-row h-screen max-w-5xl mx-auto gap-10">
                <div className="md:flex-1">
                    <h3 className="text-4xl text-center mb-2 text-gray-900">Premium video meeting now free for everyone</h3>
                    <p className="text-center text-gray-600">We built for students, Teachers and Businesses to make it free and available for all.</p>
                    {
                        login_loading ?
                            <div className="cover fixed bg-gray-100/50 top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                                <Triangle ariaLabel="indicator" color='blue' width={loading_size} height={loading_size} />
                            </div>
                            :
                            props.user.profile ?
                                <>
                                    <div className="flex items-stretch justify-center flex-col-reverse sm:flex-row gap-3 my-8">
                                        <div
                                            className="px-3 py-2 rounded-md bg-[#fcc20f] transition-all hover:bg-[#2f3f69] text-white cursor-pointer text-center"
                                            onClick={() => {
                                                new_meeting_handler()
                                            }}
                                        >Start new meeting</div>
                                        <div>
                                            <input
                                                type="text" placeholder="Enter Link"
                                                className="h-full block w-full px-4 py-2 outline-none border-2 border-gray-200 rounded-md focus:border-[#2f3f69]"
                                                onChange={(e) => {
                                                    setUrl(e.target.value)
                                                }}
                                            />
                                        </div>
                                        {
                                            url &&
                                            <div
                                                className="px-3 py-2 rounded-md bg-[#2f3f69] hover:bg-[#2f3f69] text-white cursor-pointer text-center"
                                                onClick={() => {
                                                    navigate(`/${url}`)
                                                }}
                                            >Continue</div>
                                        }
                                    </div>
                                </>
                                :
                                <div className="flex items-center justify-center gap-5 mt-8">
                                    <Link to={'/login'}>
                                        <div
                                            className="px-4 py-2 rounded-full bg-[#2f3f69] hover:bg-[#2f3f69] text-white max-w-max cursor-pointer text-lg"
                                        >Login</div>
                                    </Link>
                                    <a href={'https://redexpo.co.uk'} target='_blank'>
                                        <div
                                            className="px-4 py-2 rounded-full bg-[#2f3f69] hover:bg-[#2f3f69] text-white max-w-max cursor-pointer text-lg"
                                        >Register</div>
                                    </a>
                                </div>
                    }
                </div>
                <div
                    className="max-w-[500px] w-[90%] md:flex-1 rounded-lg overflow-hidden bg-gray-100 h-[350px] bg-center bg-cover bg-no-repeat"
                    style={{
                        backgroundImage: `url('${process.env.PUBLIC_URL}/images/bg.png')`
                    }}
                >

                </div>
            </div>
        </>
    )
}


const mapState = state => {
    return state
}

const mapDispatch = {
    get_user: get_user,
    createNewVideoMeeting: createNewVideoMeeting
}


export default connect(mapState, mapDispatch)(Homepage);