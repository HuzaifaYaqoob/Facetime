import { useState } from "react"
import { connect } from "react-redux"
import { LoginHandler } from "../../redux/actions/Auth"
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom"


const Login = (props) => {
    const [login_data, setLoginData] = useState({})
    const navigate = useNavigate()

    const LoginHandler = () => {
        props.LoginHandler(
            login_data,
            (result) => {
                Cookies.set('auth_token', result.access_token, { expires: 45 })
                navigate('/')
            },
            () => {
                alert('fial')
            }
        )
    }

    return (
        <>
            <div className="max-w-[400px] bg-white shadow-lg rounded-lg w-full p-4">
                <h3 className="text-gray-900 text-3xl text-center mb-3">Welcome back!</h3>
                <p className="text-center text-gray-600">Login with Credentials</p>
                <div className="my-4">
                    <div>
                        <input type="text" placeholder="example@mail.com"
                            className="px-4 py-2 w-full outline-none mb-3 bg-transparent rounded-md border-2 border-gray-200 focus:border-indigo-400"
                            onChange={e => {
                                setLoginData({
                                    ...login_data,
                                    username: e.target.value
                                })
                            }}
                        />
                    </div>
                    <div>
                        <input type="password" placeholder="*******"
                            className="px-4 py-2 w-full outline-none mb-3 bg-transparent rounded-md border-2 border-gray-200 focus:border-indigo-400"
                            onChange={e => {
                                setLoginData({
                                    ...login_data,
                                    password: e.target.value
                                })
                            }}
                        />
                    </div>
                    <div
                        className="bg-indigo-600 hover:bg-indigo-700 rounded-md text-white text-center px-4 py-2 cursor-pointer"
                        onClick={() => {
                            LoginHandler()
                        }}
                    >Login</div>
                </div>
            </div>
        </>
    )
}


const mapState = state => {
    return state
}

const mapDispatch = {
    LoginHandler: LoginHandler
}

export default connect(mapState, mapDispatch)(Login)