import * as React from 'react';
import Box from '@mui/material/Box';

export interface IAppFrameProps extends React.PropsWithChildren {
  headerSlot?: JSX.Element;
  contentSlot?: JSX.Element;
}

export type AppFrameComponent = React.FC<IAppFrameProps>;

export const AppFrame: AppFrameComponent = (props) => {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
      component="article"
    >
      <Box sx={{ height: '64px' }} component="header">
        {props.headerSlot}
      </Box>
      <Box sx={{ height: 'calc(100vh - 64px)' }} component="section">
        {props.contentSlot}
      </Box>
    </Box>
  );
};

AppFrame.displayName = 'AppFrame';

AppFrame.defaultProps = {};
