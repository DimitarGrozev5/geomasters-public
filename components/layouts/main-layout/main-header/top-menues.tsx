import React, { useEffect, useState } from 'react';
import {
  IconButton,
  Link,
  Paper,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NextLink from 'next/link';
import NavigationDropDownMenu from './navigation-dropdown-menu';
import NavigationLink from './navigation-link';
import { motion, MotionValue, useTransform } from 'framer-motion';
import MainDrawer from './main-drawer';
import {
  useMenuOpacity,
  useMenuPadding,
} from './hooks/get-menu-transition-values';
import { useAuth } from '../../../../hooks/useAuth';

type Props = {
  transparent?: boolean;
  invisible?: boolean;
  fixed?: boolean;
  framerScrollPosition: MotionValue<number>;
};

const TopMenues: React.ForwardRefRenderFunction<HTMLElement, Props> = (
  {
    framerScrollPosition,
    transparent = false,
    fixed = false,
    invisible = false,
  },
  ref
) => {
  const theme = useTheme();

  const menuPadding = useMenuPadding(framerScrollPosition);
  const menuOpacity = useMenuOpacity(framerScrollPosition);

  const showMobileHeader = useMediaQuery(theme.breakpoints.down('md'));

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const { loggedIn, isAdmin } = useAuth();

  return (
    <Paper
      component="nav"
      elevation={transparent ? 0 : 1}
      sx={{
        position: fixed ? 'fixed' : 'relative',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: (theme) => theme.zIndex.appBar,

        padding: 0,
        backgroundColor: (theme) =>
          transparent ? 'rgba(0, 0, 0, 0)' : theme.palette.background.default,
        borderRadius: 0,
        display: 'flex',
        visibility: invisible ? 'hidden' : 'visible',
      }}
      ref={ref}
    >
      <motion.div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          gap: theme.spacing(2),
          padding: fixed ? menuPadding : theme.spacing(6),
          backgroundColor: transparent
            ? menuOpacity
            : theme.palette.background.default,
        }}
      >
        <Link
          component={NextLink}
          href="/"
          variant="h4"
          underline="none"
          color={(theme) => theme.palette.primary.contrastText}
        >
          GeoMasters
        </Link>
        {!showMobileHeader && (
          <>
            <NavigationLink href="/">Начало</NavigationLink>
            <NavigationLink href="/services">Услуги</NavigationLink>
            {/* <NavigationLink href="/pricing">Цени</NavigationLink> */}
            <NavigationLink href="/about-us">За нас</NavigationLink>

            {loggedIn && (
              <NavigationDropDownMenu
                mainLink={
                  <NavigationLink href="/partner/profile">
                    Моят профил
                  </NavigationLink>
                }
              >
                <NavigationLink href="/partner/tasks">Задачи</NavigationLink>
              </NavigationDropDownMenu>
            )}

            {loggedIn && isAdmin && (
              <NavigationDropDownMenu
                mainLink={
                  <NavigationLink href="/admin/messages">Админ</NavigationLink>
                }
              >
                <NavigationLink href="/admin/messages">
                  Съобщения
                </NavigationLink>
                <NavigationLink href="/admin/tasks">Задачи</NavigationLink>
                <NavigationLink href="/admin/clients">Клиенти</NavigationLink>
                <NavigationLink href="/admin/partners">
                  Партньори
                </NavigationLink>
              </NavigationDropDownMenu>
            )}
          </>
        )}
        {showMobileHeader && (
          <>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ position: 'absolute', right: 8 }}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
            <MainDrawer open={mobileOpen} onClose={handleDrawerToggle} />
          </>
        )}
      </motion.div>
    </Paper>
  );
};

export default React.forwardRef(TopMenues);
