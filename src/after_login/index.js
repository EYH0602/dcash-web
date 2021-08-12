import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';


const useStyles = makeStyles({
    root: {
        width: 500,
    },
});

const AfterLoginPage = props => {
    const storage = window.localStorage;
    const classes = useStyles();
    const [ value, setValue ] = React.useState(0);
    console.log(storage.getItem('user_id'));
    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                console.log(value)
                setValue(newValue);
            }}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
            <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
        </BottomNavigation>
    )
}

export default AfterLoginPage;
