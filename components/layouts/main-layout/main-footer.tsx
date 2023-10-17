import React from 'react';

import {
  Link as MuiLink,
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Grid,
} from '@mui/material';
import Link from 'next/link';
import Spacer from '../../common/data-presentation/spacer';

type Props = {};

const MainFooter: React.FC<Props> = () => {
  return (
    <Grid
      container
      component="footer"
      sx={{
        backgroundColor: (theme) => theme.palette.alternative.A800,
        color: (theme) => theme.palette.alternative.A50,
        p: 2,
        pt: 4,
        zIndex: (theme) => theme.zIndex.fab - 1,
      }}
    >
      <Grid
        item
        lg={4}
        md={6}
        xs={12}
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        component="nav"
      >
        <List>
          <ListItem>
            <ListItemText
              primary="За сайтa"
              primaryTypographyProps={{
                color: (theme) => theme.palette.alternative.A400,
                variant: 'h6',
              }}
            />
          </ListItem>

          <ListItem>
            <ListItemButton component={Link} href="/">
              <ListItemText
                primary="Начална страница"
                primaryTypographyProps={{
                  color: (theme) => theme.palette.alternative.A400,
                }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton component={Link} href="/about-us">
              <ListItemText
                primary="За нас"
                primaryTypographyProps={{
                  color: (theme) => theme.palette.alternative.A400,
                }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton component={Link} href="/">
              <ListItemText
                primary="Декларация за поверителност"
                primaryTypographyProps={{
                  color: (theme) => theme.palette.alternative.A400,
                }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton component={Link} href="/">
              <ListItemText
                primary="Условия"
                primaryTypographyProps={{
                  color: (theme) => theme.palette.alternative.A400,
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Grid>

      <Grid
        item
        lg={4}
        md={6}
        xs={12}
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        component="nav"
      >
        <List>
          <ListItem>
            <ListItemText
              primary="Услуги"
              primaryTypographyProps={{
                color: (theme) => theme.palette.alternative.A400,
                variant: 'h6',
              }}
            />
          </ListItem>

          <ListItem>
            <ListItemButton component={Link} href="/services">
              <ListItemText
                primary="Всички услуги"
                primaryTypographyProps={{
                  color: (theme) => theme.palette.alternative.A400,
                }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton component={Link} href="/services/trasirane">
              <ListItemText
                primary="Трасиране на имот"
                primaryTypographyProps={{
                  color: (theme) => theme.palette.alternative.A400,
                }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton component={Link} href="/services/zasnemane">
              <ListItemText
                primary="Геодезическо заснемане"
                primaryTypographyProps={{
                  color: (theme) => theme.palette.alternative.A400,
                }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton component={Link} href="/services/stroitelstvo">
              <ListItemText
                primary="Стротиелство"
                primaryTypographyProps={{
                  color: (theme) => theme.palette.alternative.A400,
                }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem sx={{ ml: 2 }}>
            <ListItemButton
              component={Link}
              href="/services/stroitelstvo/proektirane"
            >
              <ListItemText
                primary="Проектиране на сгради"
                primaryTypographyProps={{
                  color: (theme) => theme.palette.alternative.A400,
                }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem sx={{ ml: 2 }}>
            <ListItemButton
              component={Link}
              href="/services/stroitelstvo/podrujka"
            >
              <ListItemText
                primary="Подръжка по време на строителство"
                primaryTypographyProps={{
                  color: (theme) => theme.palette.alternative.A400,
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Grid>

      <Grid
        item
        lg={4}
        md={6}
        xs={12}
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        component="nav"
      >
        <List>
          <ListItem>
            <ListItemText
              primary="За партньори и геодезисти"
              primaryTypographyProps={{
                color: (theme) => theme.palette.alternative.A400,
                variant: 'h6',
              }}
            />
          </ListItem>

          <ListItem>
            <ListItemButton component={Link} href="/partners">
              <ListItemText
                primary="Информация и вписване"
                primaryTypographyProps={{
                  color: (theme) => theme.palette.alternative.A400,
                }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton component={Link} href="/partner/profile">
              <ListItemText
                primary="Вашият профил"
                primaryTypographyProps={{
                  color: (theme) => theme.palette.alternative.A400,
                }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton component={Link} href="/partner/tasks">
              <ListItemText
                primary="Вашите задачи"
                primaryTypographyProps={{
                  color: (theme) => theme.palette.alternative.A400,
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Grid>

      <Grid
        item
        lg={4}
        md={6}
        xs={12}
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        component="nav"
      >
        <List>
          <ListItem>
            <ListItemText
              primary="Териториално покритие"
              primaryTypographyProps={{
                color: (theme) => theme.palette.alternative.A400,
                variant: 'h6',
              }}
            />
          </ListItem>

          <ListItem>
            <ListItemButton component={Link} href="/burgas">
              <ListItemText
                primary="обл. Бургас"
                primaryTypographyProps={{
                  color: (theme) => theme.palette.alternative.A400,
                }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton component={Link} href="/varna">
              <ListItemText
                primary="обл. Варна"
                primaryTypographyProps={{
                  color: (theme) => theme.palette.alternative.A400,
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Grid>

      <Grid item xs={12}>
        <Typography sx={{ color: (theme) => theme.palette.alternative.A400 }}>
          Използвани ресурси
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <MuiLink
            href="https://www.flaticon.com/free-icons/viber"
            title="viber icons"
            sx={{ color: (theme) => theme.palette.alternative.A500 }}
          >
            Viber icons created by Pixel perfect - Flaticon
          </MuiLink>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Spacer gap={4} />
        <Typography sx={{ color: (theme) => theme.palette.alternative.A600 }}>
          Copyright © 2022 Димитър Грозев
        </Typography>
      </Grid>
    </Grid>
  );
};

export default MainFooter;
