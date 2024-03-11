//SidePanel.jsx//
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import ArchiveIcon from '@material-ui/icons/Archive';
import NotificationsIcon from '@material-ui/icons/Notifications';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import { Link } from 'react-router-dom';

const icons = [
  { icon: <HomeIcon />, text: 'Home', to: '/' },
  { icon: <ArchiveIcon />, text: 'Archive', to: '/archive' },
  { icon: <NotificationsIcon />, text: 'Reminders', to: '/reminders' },
  { icon: <DeleteIcon />, text: 'Trash', to: '/trash' },
  { icon: <CreateIcon />, text: 'Draw', to: '/drawing' },
];

const useStyles = makeStyles((theme) => ({
  sidePanel: {
    width: '10%',
    position: 'fixed',
    top: '100px',
    left: 0,
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    zIndex: 999,
    marginLeft: '20px',
  },
  link: {
    textDecoration: 'none',
    color: '#333',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    margin: '10px 0',
    width: '60px',
    transition: 'width 0.3s ease',
  },
  icon: {
    marginRight: '30px',
    fontSize: '32px',
  },
  text: {
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  linkHovered: {
    width: '150px',
    '&:hover $text': {
      opacity: 1,
    },
  },
}));
function SidePanel() {
  const classes = useStyles();

  return (
    <div className={classes.sidePanel}>
      {icons.map((item, index) => (
        <div key={index}>
          <Link to={item.to} className={`${classes.link} ${classes.linkHovered}`}> 
            <div className={classes.icon}>{item.icon}</div>
            <div className={classes.text}>{item.text}</div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default SidePanel;