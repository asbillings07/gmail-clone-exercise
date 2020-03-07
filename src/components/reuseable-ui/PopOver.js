import PropTypes from 'prop-types'
import React from 'react'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'

export function PopOver({ isOpen, setIsOpen, addTags, anchorRef }) {
  const handleClose = () => {
    setIsOpen(false)
  }

  // return focus to the button when we transitioned from !open -> open
  const prevIsOpen = React.useRef(isOpen)
  React.useEffect(() => {
    if (prevIsOpen.current === true && isOpen === false) {
      anchorRef.current.focus()
    }

    prevIsOpen.current = isOpen
  }, [anchorRef, isOpen])

  return (
    <Popper open={isOpen} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
      {({ TransitionProps, placement }) => (
        <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center top' }}>
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList autoFocusItem={isOpen} id='menu-list-grow'>
                <MenuItem value='work' onClick={e => addTags(e.target.textContent)}>
                  work
                </MenuItem>
                <MenuItem value='Travel' onClick={e => addTags(e.target.textContent)}>
                  travel
                </MenuItem>
                <MenuItem value='business' onClick={e => addTags(e.target.textContent)}>
                  business
                </MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  )
}

PopOver.propTypes = {
  addTags: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired
}
