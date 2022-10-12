import * as React from 'react';
import Box from '@mui/material/Box';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export interface IColumnHeadingProps extends React.PropsWithChildren {
  sortable?: boolean;
}

export type ColumnHeadingComponent = React.FC<IColumnHeadingProps>;

export const ColumnHeading: ColumnHeadingComponent = (props) => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box sx={{ textAlign: 'center', flex: 1 }}>
        <Typography fontWeight="bold" color="#5e5e5e">
          {props.children}
        </Typography>
      </Box>
      <IconButton aria-label="more" id="long-button">
        <MoreVertIcon />
      </IconButton>
    </Box>
  );
};

ColumnHeading.displayName = 'ColumnHeading';

ColumnHeading.defaultProps = {};
