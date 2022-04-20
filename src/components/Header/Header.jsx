import { useDispatch } from 'react-redux';
import { Grid } from '@mui/material';
import { Person, Logout } from '@mui/icons-material';

function Header() {
    const dispatch = useDispatch();
    
    return (
        <Grid container>
            < Grid item>
                <Person/>
            </Grid>
            <Grid item>
                <Logout onClick={() => dispatch({ type: 'LOGOUT' })}/>
            </Grid>
        </Grid>
    )
}

export default Header;