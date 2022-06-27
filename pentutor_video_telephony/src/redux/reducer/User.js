


const initialState = {
    profile : {
        first_name : 'Huzaifa',
        last_name : 'Yaqoob'
    },
    is_authenticated : false,
    access_token : undefined,
}


const UserReducer = (state = initialState, action) =>{
    switch(action.type){
        case '':
            return state
        default:
            return state
    }
}

export default UserReducer