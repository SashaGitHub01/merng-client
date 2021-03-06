import React, { useState } from 'react'
import s from './Header.module.css'
import Container from '../../Container/index'
import { Link, useNavigate } from 'react-router-dom'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton'
import { useAuth } from '../../../hooks/useAuth'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRef } from 'react';
import { User } from '../../../assets/icons';

const Header = () => {
   const [visible, setVisible] = useState(false)
   const anchor = useRef(null)
   const nav = useNavigate();

   const { user, logout } = useAuth()

   const navToMain = () => {
      nav('/')
   }

   const navToProfile = () => {
      nav(`/user/${user.id}`)
   }

   const handleClose = () => {
      setVisible(false);
   }

   const handleOpen = () => {
      setVisible(true);
   }

   return (
      <header className={s.header}>
         <Container className='container'>
            <div className={s.header_row}>
               <div className={s.header_logo} onClick={navToMain}>
                  <h1 className={s.logo_text}>
                     MyApp
                  </h1>
               </div>
               <nav className={s.nav}>
                  <div className={s.nav_list}>
                     <Link className={s.nav_item} to={'/'}>
                        <span>
                           Home
                        </span>
                        <div className={s.underline}></div>
                     </Link>
                     {user
                        ? <div className={s.user}>
                           <div className={s.user_img} onClick={navToProfile}>
                              <img
                                 src={user.avatar}
                                 alt="user"
                              />
                           </div>
                           <div className="">
                              <IconButton
                                 ref={anchor}
                                 onClick={handleOpen}
                              >
                                 <MoreVertIcon />
                              </IconButton>
                           </div>
                           <Menu
                              open={visible}
                              anchorEl={anchor?.current}
                              onClose={handleClose}
                              anchorOrigin={{
                                 vertical: "bottom",
                                 horizontal: 'left'
                              }}
                              transformOrigin={{
                                 vertical: "top",
                                 horizontal: 'center'
                              }}
                           >
                              <MenuItem className={s.menu_item} onClick={navToProfile}>
                                 <div className={s.menu_item_content}>
                                    <User
                                       className={`${s.menu_icon} ${s.profile}`}
                                    />
                                    <span>
                                       {user.username}
                                    </span>
                                 </div>
                              </MenuItem>
                              <MenuItem onClick={logout} className={s.menu_item}>
                                 <div className={s.menu_item_content}>
                                    <LogoutIcon
                                       className={s.menu_icon}
                                       color='error'
                                    />
                                    <span>
                                       Logout
                                    </span>
                                 </div>
                              </MenuItem>
                           </Menu>
                        </div>
                        : <Link to={'/login'} className={s.nav_item}>
                           <span>
                              Sign In
                           </span>
                           <div className={s.underline}></div>
                        </Link>}
                  </div>
               </nav>
            </div>
         </Container>
         <div className={s.border} />
      </header>
   )
}

export default Header