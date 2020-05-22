import React from 'react'
import {createStyles, makeStyles} from '@material-ui/core';
import List from '@material-ui/core/List';
import {history, withRouter} from 'umi'
import {getMenuData, MenuDataItem} from '@ant-design/pro-layout';
import Logo from '../Logo'
import MenuItem from '../MenuItem'
import routes from '../../../config/routes'

const {menuData} = getMenuData(routes)

const menus = menuData && menuData[0] && menuData[0].children || []
const useStyles = makeStyles(() =>
  createStyles({
    slRoot: {
      width: '100%',
      position: 'sticky',
      top: 0,
      zIndex: 100
    },
  }),
);

const Slider = ({location}: any) => {
  const classes = useStyles();
  const menuItemClick = (item: MenuDataItem) => {
    // @ts-ignore
    if (item.path !== location.pathname) history.push(item.path);
  }

  return (
    <div className={classes.slRoot}>
      <Logo />

      <List
        disablePadding
        component="nav"
      >
        {
          menus.map((item: MenuDataItem) => (
            <MenuItem
              locale={item.locale} key={item.key} active={location.pathname} onClick={menuItemClick} item={item}
            />
          ))
        }
      </List>
    </div>
  )
}

export default withRouter(Slider)

