import * as React from 'react';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export interface IOrderStateFilterProps extends React.PropsWithChildren {
  count: number;
  orderState?: string;
  onFilterClick: (orderState?: string) => void;
  isActive?: boolean;
}

export type OrderStateFilterComponent = React.FC<IOrderStateFilterProps>;

export const OrderStateFilter: OrderStateFilterComponent = (props) => {
  const handleClick = React.useCallback(() => {
    props.onFilterClick(props.orderState);
  }, [props.onFilterClick, props.orderState]);
  return (
    <Box
      sx={{
        height: '48px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 12px',
        borderBottom: props.isActive ? '2px solid #5e5e5e' : undefined,
      }}
      onClick={handleClick}
    >
      <Badge
        badgeContent={props.count}
        sx={{ top: props.isActive ? '2px' : undefined }}
        max={100000}
      >
        <Typography fontWeight={props.isActive ? '900' : '400'}>
          {props.children}
        </Typography>
      </Badge>
    </Box>
  );
};

OrderStateFilter.displayName = 'OrderStateFilter';

OrderStateFilter.defaultProps = {};
