import { useDispatch } from 'react-redux';
import { Paper,  Toolbar, AppBar, Box, Typography, Button, IconButton } from '@mui/material';
import { Person, Logout, Menu } from '@mui/icons-material';

function TopBar() {
    const dispatch = useDispatch();
    
    return (
        <Box sx={{ flexGRow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <Menu />
                    </IconButton>
                    <Typography>Title Here</Typography>  
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <Person />
                    </IconButton>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => dispatch({ type: 'LOGOUT' })}
                    >
                        <Logout />
                    </IconButton>
                </Toolbar>   
            </AppBar>
        </Box>
    )
}

export default TopBar;