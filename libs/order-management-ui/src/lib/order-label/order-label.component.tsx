import * as React from 'react';
import Chip from '@mui/material/Chip';

export interface IOrderLabelProps {
  label: string;
}

export type OrderLabelComponent = React.FC<IOrderLabelProps>;

export const OrderLabel: OrderLabelComponent = (props) => {
  const color =
    props.label === 'COMPLETE'
      ? '#c6e9a6'
      : props.label === 'IN_PROGRESS'
      ? '#a8c7e7'
      : 'default';
  return <Chip label={props.label} sx={{ background: color }} />;
};

OrderLabel.displayName = 'OrderLabel';

OrderLabel.defaultProps = {};
