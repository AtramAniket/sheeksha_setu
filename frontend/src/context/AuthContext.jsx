import {createContext, useContext, useState} from "react";

const AuthContext = createContext(null);

export function AuthProvider({children}){

	const [user, setUser] = useState(null);
	const [token, setToken] = useState(()=>localStorage.getItem("access_token"));

	
	const login = (accessToken) => {

		localStorage.setItem("access_token", accessToken);
		
		setToken(accessToken);
	}

	
	const logout = () => {
		
		localStorage.removeItem("access_token");
		
		setUser(null);
		
		setToken(null);
	}

	
	const isAuthenticated = Boolean(token);

	
	return(

			<AuthContext.Provider value = {{
					user,
					token,
					login,
					logout,
					setUser,
					isAuthenticated
			}}
			>
				{children}
			</AuthContext.Provider>

		)
}