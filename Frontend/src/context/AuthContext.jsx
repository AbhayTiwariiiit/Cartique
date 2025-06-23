import { createContext } from 'react'
export const AuthDataContext=createContext();
function AuthContext({children}) {
  let serverURL="http://localhost:8080";
  let value={serverURL};
  return (
    <div>
        <AuthDataContext.Provider value={value}>
        {children}
        </AuthDataContext.Provider>
    </div>
  )
}
export default AuthContext;
