import React, { FC, useEffect, useRef } from 'react';
import { Row } from 'react-table';

type FeTableExpandableProps<T extends object> = {
  isExpanded: boolean;
  renderExpandedComponent?: (data: T, index: number) => React.ReactNode;
  row: Row<T>;
};
export const FeTableExpandable: FC<FeTableExpandableProps<any>> = <T extends object>(
  props: FeTableExpandableProps<T>
) => {
  const { isExpanded, renderExpandedComponent, row } = props;
  const ref = useRef<HTMLDivElement | null>();
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    if (isExpanded) {
      ref.current?.classList?.add?.('is-expanded');
    } else {
      ref.current?.classList?.remove?.('is-expanded');
    }
  }, [isExpanded]);
  return (
    <div ref={(node) => (ref.current = node)} className='fe-table__tr-expanded-content'>
      {isExpanded && renderExpandedComponent?.(row.original, row.index)}
    </div>
  );
};
