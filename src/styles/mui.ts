// mui.ts

import { styled } from '@mui/material/styles';
import { sizes } from './sizes';
import { colors } from './colors';

export const DrawerMuiStyle = {
  width: sizes.drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: sizes.drawerWidth,
    boxSizing: 'border-box',
    bgcolor: '#3F4D67',
    color: '#9FB3D0',
    overflow: 'hidden',
  },
};

export const DrawerToolbarMuiStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  top: 5,
};

// modal
export const ModalMuiStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 330,
  bgcolor: 'background.paper',
  boxShadow: 24,
};

// modal form style
export const PrimaryButtonStyle = {
  width: '160px',
  borderRadius: 0,
};

export const SecondaryButtonStyle = {
  width: '160px',
  bgcolor: '#F2F2F2',
  color: 'black',
  '&:hover': {
    backgroundColor: '#b2bec3',
  },
  borderRadius: 0,
};
export const ModalFormStyle = {
  width: '330px',
  height: '100px',
  display: 'flex',
  alignContent: 'center',
};

export const ModalFormContentsStyle = {
  display: 'flex',
  flexGrow: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '12px',
  bgcolor: '#F3F3F3',
  borderRadius: 0,
  px: 0,
};

// LinkButton hover Style
export const LinkButtonHoverStyle = {
  ':hover': { color: colors.text.active },
};

// TitleMenuBox Icon Style
export const TitleMenuIconStyle = {
  display: 'flex',
  alignItems: 'center',
  minWidth: '40px',
  height: '20px',
};
