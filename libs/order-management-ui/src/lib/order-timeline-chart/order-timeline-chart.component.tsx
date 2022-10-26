import * as React from 'react';
import Box from '@mui/material/Box';
import { IOrderStatistics } from '@oms/order-management-gql-client';

export interface IOrderTimelineChartProps {
  statistics: IOrderStatistics;
}

export type OrderTimelineChartComponent = React.FC<IOrderTimelineChartProps>;

function buildChartTranches(statistics: IOrderStatistics) {
  const tranches = [];
  const currDate = new Date(statistics.from);
  const to = new Date(statistics.to);
  const records = [...statistics.records];

  while (currDate.getTime() < to.getTime() + statistics.bucketSize) {
    const record = records[0];

    if (
      record &&
      new Date(record.timestamp).getTime() <
        currDate.getTime() + statistics.bucketSize
    ) {
      tranches.push(record);
      records.shift();
    } else {
      tranches.push({
        timestamp: currDate.getTime(),
        count: 0,
        sum: 0,
      });
    }
    currDate.setTime(currDate.getTime() + statistics.bucketSize);
  }

  return tranches;
}

export const OrderTimelineChart: OrderTimelineChartComponent = (props) => {
  const tranches = React.useMemo(() => {
    return buildChartTranches(props.statistics);
  }, [props.statistics]);
  const maxValue = props.statistics.records.reduce(
    (max, record) => Math.max(max, record.count),
    0
  );
  const onePercent = maxValue / 100;
  const tranchWidth = 10;
  const gapSize = 1;
  const canvasWidth = tranches.length * (tranchWidth + gapSize) - gapSize;

  return (
    <Box sx={{ width: '100%' }}>
      <svg
        viewBox={`0 0 ${canvasWidth} 100`}
        style={{ background: 'grey', height: '150px', width: '100%' }}
      >
        {tranches.map((tranch, ix) =>
          tranch.count > 0 ? (
            <rect
              key={ix}
              width={tranchWidth}
              height={Math.floor(tranch.count / onePercent)}
              fill="yellow"
              x={ix * (tranchWidth + gapSize)}
              y={100 - Math.floor(tranch.count / onePercent)}
            />
          ) : null
        )}
      </svg>
    </Box>
  );
};

OrderTimelineChart.displayName = 'OrderTimelineChart';

OrderTimelineChart.defaultProps = {};
