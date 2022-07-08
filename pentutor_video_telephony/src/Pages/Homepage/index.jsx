import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { get_user } from "../../redux/actions/Auth";
import Cookies from 'js-cookie'
import { createNewVideoMeeting } from "../../redux/actions/Video";
import { Triangle } from "react-loader-spinner";


const Homepage = (props) => {
    const loading_size = 80
    const navigate = useNavigate()
    const dispatch = useDispatch()
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
                alert('fail')
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
        // let socket = new WebSocket('ws://192.168.238.107:8000/ws/video-chat/hello/')
        // socket.onopen = (e) => {
        //     console.log(e)
        // }
        // socket.onmessage = (e) => {
        //     console.log(e)
        // }
        // socket.onclose = (e) => {
        //     console.log(e)
        // }
    }, [])
    return (
        <>
            <div className="flex items-center justify-center h-screen">
                <div>
                    <h3 className="text-4xl text-center mb-2 text-gray-900">Premium video meeting now free <br />for everyone</h3>
                    <p className="text-center text-gray-600">We built for students, Teachers and Businesses to make it free and available for all.</p>
                    {
                        login_loading ?
                            <div className="cover fixed bg-gray-100/50 top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                                <Triangle ariaLabel="indicator" color='blue' width={loading_size} height={loading_size} />
                            </div>
                            :
                            props.user.profile ?
                                <>
                                    <div className="flex items-stretch justify-center gap-3 my-8">
                                        <div
                                            className="px-3 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer text-center"
                                            onClick={() => {
                                                new_meeting_handler()
                                            }}
                                        >Start new meeting</div>
                                        <div>
                                            <input type="text" placeholder="Enter Link" className="h-full block w-full px-4 py-2 outline-none border-2 border-gray-200 rounded-md focus:border-indigo-600" />
                                        </div>
                                    </div>
                                </>
                                :
                                <div className="flex items-center justify-center gap-5 mt-8">
                                    <Link to={'/login'}>
                                        <div
                                            className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white max-w-max cursor-pointer text-lg"
                                        >Login</div>
                                    </Link>
                                    <a href={'https://pentutor.com'} target='_blank'>
                                        <div
                                            className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white max-w-max cursor-pointer text-lg"
                                        >Register</div>
                                    </a>
                                </div>
                    }
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