import{AppBar, Toolbar, Typography} from '@mui/material';
import {logo} from '../constants/constant';

const Header=()=>{
    return(
        <AppBar color="secondary" position='static'>
            <Toolbar>
                <img src={logo} alt="logo" style={{width:100,marginRight:10}}/>
                <Typography> Evernote</Typography>
            </Toolbar>
        </AppBar>
    )
}
export default Header;