import React from "react"
import Input from "@mui/material/Input"
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import { useDispatch, useSelector } from "react-redux"
import { setUserSlice } from "../redux/slice/user"
import { addUserSlice, editUserSlice } from "../redux/slice/users"
import { nanoid } from "@reduxjs/toolkit"
import { CREATE_USER, UPDATE_USER_BY_ID } from "../redux/types"
import Divider from "@mui/material/Divider"
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';




const MyForm = () => {

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });


    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const handleChange = (prop) => (event) => {
        dispatch(setUserSlice({ ...user, [prop]: event.target.value }))
    }
    const handleSubmit = () => {
        user.id === 0 ? dispatch({ type: CREATE_USER, user: { ...user, id: nanoid(8) } }) : dispatch({ type: UPDATE_USER_BY_ID, user })

        dispatch(setUserSlice({
            id: 0,
            name: '',
            email: '',
            password: ''
        }))
    }



    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );



    return (


        <div>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>Editar</Button>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        <Input style={{ margin: '10px' }} margin="normal" value={user.id} fullWidth disabled />
                        <Input style={{ margin: '10px' }} onChange={handleChange('name')} placeholder="Enter Name" value={user.name} fullWidth />
                        <Input style={{ margin: '10px' }} onChange={handleChange('email')} placeholder="Enter Email" value={user.email} fullWidth />
                        <Input style={{ margin: '10px' }} onChange={handleChange('password')} placeholder="Enter Password" value={user.password} fullWidth />
                        <Button style={{ margin: '10px' }} onClick={() => handleSubmit()} fullWidth variant="contained">Submit</Button>

                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    )
}
export default MyForm