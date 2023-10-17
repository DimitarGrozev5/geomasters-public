import {
  Box,
  Fade,
  Menu,
  Paper,
  Popover,
  Popper,
  Stack,
  useTheme,
} from '@mui/material';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { NavigationLinkProps } from './navigation-link';

type Props = {
  mainLink: React.ReactElement<NavigationLinkProps>;
  children:
    | React.ReactElement<NavigationLinkProps>[]
    | React.ReactElement<NavigationLinkProps>;
};

const NavigationDropDownMenu: React.FC<Props> = ({ mainLink, children }) => {
  const menuId = useId();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleHover = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLeave = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();
  const twoSpaces = useMemo(() => +theme.spacing(2).replace('px', ''), [theme]);

  const [topOffset, setTopOffset] = useState(-1 * twoSpaces);
  useEffect(() => {
    if (anchorEl) {
      setTopOffset(-1 * anchorEl.getBoundingClientRect().height - twoSpaces);
    }
  }, [anchorEl, twoSpaces]);

  return (
    <>
      <Box onMouseOver={handleHover} sx={{ position: 'relative' }}>
        {mainLink}
      </Box>

      <Popper
        id={menuId}
        anchorEl={anchorEl}
        transition
        open={!!anchorEl}
        // onClose={handleLeave}
        // anchorReference="anchorPosition"
        // anchorPosition={{
        //   top: (anchorEl?.getBoundingClientRect().top || 0) - twoSpaces,
        //   left: (anchorEl?.getBoundingClientRect().left || 0) - twoSpaces,
        // }}
        // PaperProps={{ onMouseLeave: handleLeave }}
        // TransitionComponent={Fade}
        placement="bottom-start"
        sx={{
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper
              elevation={5}
              sx={{
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                position: 'relative',
                top: topOffset,
                left: (theme) => theme.spacing(-2),
              }}
              onMouseLeave={handleLeave}
            >
              {mainLink}
              {children}
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default NavigationDropDownMenu;
