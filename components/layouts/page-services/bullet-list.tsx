import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

type BulletItem = {
  primary: React.ReactNode;
  secondary?: string;
};

type Props = {
  items: BulletItem[];
};

const ServiceBulletList: React.FC<Props> = ({ items }) => {
  return (
    <List>
      {items.map((i) => (
        <ListItem key={`${i.primary}${i.secondary}`} sx={{ p: 0, pl: 4 }}>
          <ListItemIcon
            sx={{
              minWidth: (theme) => theme.spacing(4),
              pt: (theme) => theme.spacing(0.5),
              alignItems: 'flex-start',
              alignSelf: 'stretch',
            }}
          >
            <KeyboardDoubleArrowRightIcon
              sx={{
                color: (theme) => theme.palette.primary.A500,
              }}
            />
          </ListItemIcon>
          <ListItemText primary={i.primary} secondary={i.secondary} />
        </ListItem>
      ))}
    </List>
  );
};

export default ServiceBulletList;
