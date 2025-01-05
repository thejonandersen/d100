import {useSelector} from 'react-redux'
import {RootState} from '../state/store'
import {jwtDecode} from 'jwt-decode';

export default (): boolean => {
    const token = useSelector((state: RootState) => state.user.token)
    if (!token) return false;

    try {
        const {exp} = jwtDecode(token as string);
        const currentTime = Date.now() / 1000;
        return !!exp && exp > currentTime;
    } catch (error) {
        console.error('Error decoding token:', error);
        return false;
    }
}
