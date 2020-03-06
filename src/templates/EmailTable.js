import React, { useState } from 'react'
import MaterialTable from 'material-table'
import { Container } from '@material-ui/core'
import { TableIcons } from '../components/reuseable-ui/TableIcons'
import { useStore } from '../Store'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - 240px)`,
      marginRight: 0,
      marginTop: 40
    }
  }
}))

export const EmailTable = () => {
  const classes = useStyles()
  const store = useStore()
  const [tableState, setTableState] = useState({
    columns: [
      { title: 'From', field: 'sender' },
      { title: 'Date', field: 'date' },
      { title: 'Subject', field: 'subject' },
      { title: 'Tags', field: 'tags' }
    ],
    data: store.emails
  })

  return (
    <Container className={classes.container}>
      <MaterialTable
        title='Roles'
        icons={TableIcons}
        columns={tableState.columns}
        data={tableState.data}
        options={{
          emptyRowsWhenPaging: false,
          pageSize: 10,
          pageSizeOptions: [10, 25, 50, 100]
        }}
        editable={{
          // onRowUpdate: (newRole, prevRole) => {
          //   RoleService.updateRole(newRole, newRole._id).then(res => {
          //     if (res) {
          //       setToast({
          //         isOpen: true,
          //         message: `${prevRole.name} has been successfully updated to ${newRole.name}`,
          //         variant: 'success'
          //       })
          //     }
          //   })
          //   return new Promise(resolve => {
          //     setTimeout(() => {
          //       resolve()
          //       if (prevRole) {
          //         setData(prevState => {
          //           const data = [...prevState.data]
          //           data[data.indexOf(prevRole)] = newRole
          //           return { ...prevState, data }
          //         })
          //       }
          //     }, 600)
          //   })
          // },
          onRowDelete: email => {
            return new Promise(resolve => {
              setTimeout(() => {
                resolve()
                setTableState(prevState => {
                  const data = [...prevState.data]
                  data.splice(data.indexOf(email), 1)
                  return { ...prevState, data }
                })
              }, 600)
            })
          }
        }}
      />
    </Container>
  )
}
