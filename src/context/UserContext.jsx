import {createContext , useState} from 'react'


export const UserContext= createContext(null)

function User({children})
{
    const user = JSON.parse(localStorage.getItem('user'));
    const admin = JSON.parse(localStorage.getItem('admin'));
    const [userDetails, setUserDetails]=useState(user)
    const [adminDetails, setAdminDetails]=useState(admin)



    return(
        <UserContext.Provider value={{userDetails, setUserDetails,adminDetails, setAdminDetails}}>
            {children}
        </UserContext.Provider>
    )
}

export default User;