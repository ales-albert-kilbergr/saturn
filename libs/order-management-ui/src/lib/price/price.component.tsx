import * as React from 'react';
import { FormattedNumber } from 'react-intl';

export interface IPriceProps {
  amount: number;
}

export type PriceComponent = React.FC<IPriceProps>;

export const Price: PriceComponent = (props) => {
  return (
    <span>
      <FormattedNumber value={props.amount} /> €
    </span>
  );
};

Price.displayName = 'Price';

Price.defaultProps = {};
