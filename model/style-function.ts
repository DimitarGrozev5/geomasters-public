import { SxProps, Theme } from '@mui/material';

export type StyleSheetFunction = (theme: Theme) => { [id: string]: SxProps };
