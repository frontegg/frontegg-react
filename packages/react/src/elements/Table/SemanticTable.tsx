import React, { FunctionComponent } from 'react';
import { ITable, ITableCell } from './interfaces';
import { Table } from 'semantic-ui-react';
import classNames from 'classnames';
import { memoEqualNoChildren } from '@providers';
import { Loader } from '@elements';

const mapper = <T extends {}, ID>(props: ITable<T, ID>) => props;

const TableRow = (props: { data: any; className?: string; children: any }) => {
  return <Table.Row className={props.className}>
    {props.children}
  </Table.Row>;
};

const MemoTableRow = React.memo(TableRow, memoEqualNoChildren);

export default class SemanticTable<T, ID> extends React.Component<ITable<T, ID>> {

  cells: {
    [P in keyof T]: FunctionComponent<ITableCell<T, ID>>
  };

  constructor(props: ITable<T, ID>) {
    super(props);
    this.cells = this.buildCells() as any;
  }

  buildCells = () => {
    return (this.props.columns || []).map(col => {
      return { [col.name]: React.memo(col.Cell, memoEqualNoChildren) };
    }).reduce((p, n) => ({ ...p, ...n }), {});
  };
  getRowData = (index: number) => () => {
    return this.props.rows[index];
  };

  componentDidUpdate(prevProps: ITable<T, ID>) {
    if (prevProps.columns !== this.props.columns) {
      this.cells = this.buildCells() as any;
    }
  }

  render() {
    const { classes, columns, rows, rowKey, loading } = mapper<T, ID>(this.props);
    return <div className={classNames('fe-table-wrapper', classes?.wrapper)}>
      <Table className={classNames('fe-table', classes?.table)}>
        <Table.Header className={classNames(classes?.headerRow)}>
          <Table.Row>
            {(columns || []).map((col, idx) => (
              <Table.HeaderCell key={idx} className={classNames(classes?.headerCell)}>
                {col.displayName}
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows.map((data: T, idx: number) => <MemoTableRow key={(data as any)[rowKey || 'id']} data={data} className={classes?.bodyRow}>
            {(columns || []).map(col => {
              const MemoCell = this.cells[col.name] as any;
              return <Table.Cell key={col.name as string} className={classNames(classes?.bodyCell)}>
                <MemoCell value={data[col.name]}
                          column={col}
                          id={(data as any)[rowKey || 'id']}
                          index={idx}
                          rowData={this.getRowData(idx)}/>
              </Table.Cell>;
            })}
          </MemoTableRow>)}
        </Table.Body>
      </Table>
      {loading && <Loader/>}
    </div>;
  }
}
