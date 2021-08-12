import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import { green } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import Input from '../utils/input';

function TabPanel (props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`action-tabpanel-${index}`}
            aria-labelledby={`action-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps (index) {
    return {
        id: `action-tab-${index}`,
        'aria-controls': `action-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#2A3441',
        width: 600,
        position: 'relative',
        margin: '0 auto',
        minHeight: 200,
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    fabGreen: {
        color: theme.palette.common.white,
        backgroundColor: green[ 500 ],
        '&:hover': {
            backgroundColor: green[ 600 ],
        },
    },
}));

export default function FloatingActionButtonZoom () {
    const classes = useStyles();
    const theme = useTheme();
    const [ value, setValue ] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };

    const fabs = [
        {
            color: 'primary',
            className: classes.fab,
            text: 'UPDATE',
            label: "update",
        },
        {
            color: 'secondary',
            className: classes.fab,
            text: 'DEPOSIT',
            label: "deposit",
        },
        {
            color: 'inherit',
            className: clsx(classes.fab, classes.fabGreen),
            text: 'SEND',
            label: 'transfer',
        },
    ];

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="action tabs example"
                >
                    <Tab label="Update Email" {...a11yProps(0)} />
                    <Tab label="Deposit" {...a11yProps(1)} />
                    <Tab label="Transfer" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <Input
                        id='email'
                        label="email"
                        predicted="xxx@xxx.com"
                        locked={false}
                        active={false}
                    /> <br />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <Input id="d_amount" label="amount" locked={false} active={false} /> <br />
                    <Input id="c_num" label="card number" locked={false} active={false} /> <br />
                    <Input id="c_date" label="expire date yyyy/MM/DD" locked={false} active={false} /> <br />
                    <Input id="cvc" label="cvc" locked={false} active={false} />
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <Input id="s_amount" label="amount" locked={false} active={false} /> <br />
                    <Input id="to" label="to" predicted="eeeh" locked={false} active={false} />
                </TabPanel>
            </SwipeableViews>
            {fabs.map((fab, index) => (
                <Zoom
                    key={fab.color}
                    in={value === index}
                    timeout={transitionDuration}
                    style={{
                        transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`,
                    }}
                    unmountOnExit
                >
                    <Fab
                        variant="extended"
                        size="medium"
                        color={fab.color}
                        // aria-label={fab.label} 
                        className={fab.className}
                    >
                        {fab.text}
                    </Fab>
                </Zoom>
            ))}
        </div>
    );
}
