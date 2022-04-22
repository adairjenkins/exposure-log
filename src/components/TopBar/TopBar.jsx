import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Paper, Menu, MenuItem, Toolbar, AppBar, Box, Typography, Button, IconButton } from '@mui/material';
import { Person, Logout, MoreVert } from '@mui/icons-material';

function TopBar() {
    const dispatch = useDispatch();
    const history = useHistory();

    let headingTitle = '';
    switch(useParams().url) {
        case 'hierarchy':
            headingTitle = 'Hierarchy';
            break
        case 'exposure-form':
            headingTitle = 'Log Exposure';
            break
        case 'history':
            headingTitle = 'History';
            break
        
    }

    const handleClick = () => {
        console.log('menu clicked!');
    }

    return (
        <Box sx={{ flexGRow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        onClick={handleClick}
                        edge="start"
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <MoreVert />
                    </IconButton>
                    <Typography variant="h5">{headingTitle}</Typography>
                    <IconButton
                        size="large"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        label="user"
                        onClick={() => { history.push('/user') }}
                    >
                        <Person label="user" />
                    </IconButton>
                    <Button color="inherit" onClick={() => dispatch({ type: 'LOGOUT' })}>Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default TopBar;