import Button from '@mui/material/Button';
import { useMsal } from '@azure/msal-react'; //react Hook
export const SignInButton = () => {
    const {instance} = useMsal(); // access to app instance. And get api from msal
    const handleSignIn = () =>{
        instance.loginRedirect({
            scopes:['user.read']
        }) // api will redirect browser to azure AD and prompt the user to sign in with their uername and password
    }
    return (
        <Button color="inherit" onClick={handleSignIn}>Sign in</Button>
    )
};