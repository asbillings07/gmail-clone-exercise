import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import { CssBaseline, Drawer, Hidden, IconButton, Toolbar, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { SideBarList } from '../components/SideBarList'
const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  toolbarColor: {
    backgroundColor: '#c03b2b'
  },
  drawerPaper: {
    width: drawerWidth
  }
}))

export function SideBar({ container }) {
  const classes = useStyles()
  const theme = useTheme()
  const [isOpen, setIsOpen] = React.useState(false)

  const handleDrawerToggle = () => setIsOpen(!isOpen)

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar className={classes.toolbarColor}>
          <IconButton color='inherit' aria-label='open drawer' edge='start' onClick={handleDrawerToggle} className={classes.menuButton}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap>
            Me-Mail
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label='mailbox folders'>
        <Hidden smUp implementation='css'>
          <Drawer
            container={container}
            variant='temporary'
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={isOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true
            }}
          >
            <SideBarList toolbar={classes.toolbar} />
          </Drawer>
        </Hidden>
        {/* if on mobile sidebar will be hidden by default */}
        <Hidden xsDown implementation='css'>
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant='permanent'
            open
          >
            <SideBarList toolbar={classes.toolbar} />
          </Drawer>
        </Hidden>
      </nav>
    </div>
  )
}

SideBar.propTypes = {
  container: PropTypes.string
}
