import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, ClickAwayListener, MenuList, MenuItem } from '@material-ui/core'
import PropTypes from 'prop-types'

export const CustomDialog = ({ isOpen, handleClose, title, subtitle, children, handleTag }) => {
  return (
    <>
      <Dialog data-testid='DialogBox' maxWidth='sm' open={isOpen} onClose={handleClose} aria-labelledby='max-width-dialog-title'>
        <DialogTitle id='max-width-dialog-title'>{title}</DialogTitle>
        <DialogContent data-testid='DialogContent'>
          <DialogContentText>{subtitle}</DialogContentText>
          <Paper data-testid='dialogBox'>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList autoFocusItem={isOpen} id='menu-list-grow'>
                <MenuItem value='work' data-testid='workItem' onClick={e => handleTag(e.target.textContent)}>
                  work
                </MenuItem>
                <MenuItem value='Travel' data-testid='travelItem' onClick={e => handleTag(e.target.textContent)}>
                  travel
                </MenuItem>
                <MenuItem value='business' data-testid='businessItem' onClick={e => handleTag(e.target.textContent)}>
                  business
                </MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

CustomDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  handleTag: PropTypes.func.isRequired
}
