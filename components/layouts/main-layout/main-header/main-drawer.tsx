import { Dispatch, SetStateAction, useState } from 'react';
import NextLink from 'next/link';

import {
  Collapse,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useAuth } from '../../../../hooks/useAuth';

type Props = {
  open: boolean;
  onClose: () => void;
};

const MainDrawer: React.FC<Props> = ({ open, onClose }) => {
  const container = document.body;

  const [profile, setProfile] = useState(false);
  const [admin, setAdmin] = useState(false);

  const toggleExpand = (setter: Dispatch<SetStateAction<boolean>>) => () =>
    setter((val) => !val);

  const { loggedIn, isAdmin } = useAuth();

  return (
    <Drawer
      container={container}
      anchor="right"
      variant="temporary"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
      }}
    >
      <List
        sx={{ width: '100%' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton component={NextLink} href="/" onClick={onClose}>
          <ListItemText primary="Начало" />
        </ListItemButton>

        <ListItemButton component={NextLink} href="/services" onClick={onClose}>
          <ListItemText primary="Услуги" />
        </ListItemButton>

        {/* <ListItemButton component={NextLink} href="/pricing" onClick={onClose}>
          <ListItemText primary="Цени" />
        </ListItemButton> */}

        <ListItemButton component={NextLink} href="/about-us" onClick={onClose}>
          <ListItemText primary="За нас" />
        </ListItemButton>

        {loggedIn && (
          <>
            <ListItemButton onClick={toggleExpand(setProfile)}>
              <ListItemText primary="Профил" />
              {profile ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={profile} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 6 }}
                  component={NextLink}
                  href="/partner/profile"
                  onClick={onClose}
                >
                  <ListItemText primary="Моят Профил" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 6 }}
                  component={NextLink}
                  href="/partner/tasks"
                  onClick={onClose}
                >
                  <ListItemText primary="Задачи" />
                </ListItemButton>
              </List>
            </Collapse>
          </>
        )}
        {/* TODO: Find a solution that is not so hacky for authenticating admins */}
        {loggedIn && admin && (
          <>
            {' '}
            <ListItemButton onClick={toggleExpand(setAdmin)}>
              <ListItemText primary="Админ" />
              {admin ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={admin} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {/* <ListItemButton
                  sx={{ pl: 6 }}
                  component={NextLink}
                  href="/admin"
                  onClick={onClose}
                >
                  <ListItemText primary="Админ Панел" />
                </ListItemButton> */}
                <ListItemButton
                  sx={{ pl: 6 }}
                  component={NextLink}
                  href="/admin/messages"
                  onClick={onClose}
                >
                  <ListItemText primary="Съобщения" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 6 }}
                  component={NextLink}
                  href="/admin/tasks"
                  onClick={onClose}
                >
                  <ListItemText primary="Задачи" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 6 }}
                  component={NextLink}
                  href="/admin/clients"
                  onClick={onClose}
                >
                  <ListItemText primary="Клиенти" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 6 }}
                  component={NextLink}
                  href="/admin/partners"
                  onClick={onClose}
                >
                  <ListItemText primary="Партньори" />
                </ListItemButton>
              </List>
            </Collapse>
          </>
        )}
      </List>
    </Drawer>
  );
};

export default MainDrawer;
