import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Paper, ListItemText, Menu, ListItemIcon, MenuItem, Toolbar, AppBar, Box, Typography, Button, IconButton } from '@mui/material';
import { Person, Logout, MoreVert } from '@mui/icons-material';

function TopBar() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(store => store.user);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    console.log('user:', user);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    let headingTitle = '';
    switch (useParams().url) {
        case 'hierarchy':
            headingTitle = 'Hierarchy';
            break
        case 'exposure-form':
            headingTitle = 'Log Exposure';
            break
        case 'history':
            headingTitle = 'History';
            break
        case 'user':
            headingTitle = `Welcome, ${user.username}`;
            break
        case 'home':
            headingTitle = `Welcome, ${user.username}`
            break
        case 'about':
            headingTitle = `About Exposure Log`
    }

    const handleLogOut = () => {
        dispatch({ type: 'LOGOUT' });
        setAnchorEl(null);
    }

    return (
        <Box sx={{ flexGrow:1 }}>
            {user.id ?

                <>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                <MoreVert />
                            </IconButton>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={() => { history.push('/user') }}>
                                    <ListItemIcon>
                                        <Person />
                                    </ListItemIcon>
                                    <ListItemText>USER</ListItemText>
                                </MenuItem>
                                <MenuItem onClick={handleLogOut}>
                                    <ListItemIcon>
                                        <Logout />
                                    </ListItemIcon>
                                    <ListItemText>LOGOUT</ListItemText>
                                </MenuItem>
                            </Menu>

                            <Typography variant="h5" sx={{marginLeft:2, fontSize:24}}>{headingTitle}</Typography>
                        </Toolbar>
                    </AppBar>
                </>
                :
                <AppBar>
                    <Toolbar>
                        <Typography variant="h5" sx={{marginLeft:2, fontSize:24}}>
                            Exposure Log
                        </Typography>
                    </Toolbar>
                </AppBar>
            }
        </Box>
    )
}

export default TopBar;