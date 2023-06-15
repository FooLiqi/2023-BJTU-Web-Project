import { getTokenFromLocalStorage } from "../utils";
import { Navigate } from "react-router";
function AuthComponent({children}) {
	const isToken = getTokenFromLocalStorage()
	if(isToken) {
		console.log('cookie is ' + getTokenFromLocalStorage())
		return <>{children}</>
	}
	return <Navigate to = '/login' replace></Navigate>
}

export {AuthComponent}