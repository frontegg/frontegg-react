import React, { FC } from 'react';
import { ITable, ITableCell, ITableColumns, Table, TableActiveInactiveCell, TableDateCell, TableTitleCell } from '@elements/Table';
import { IReportRecord } from '@api/ReportsApi';
import { connectFrontegg, IFronteggMapper } from '@providers';

export interface IReportsTableComponents<T> {
  TitleCell?: FC<ITableCell<T>>;
  ScheduleCell?: FC<ITableCell<T>>;
  StatusCell?: FC<ITableCell<T>>;
  LastGenerationsCell?: FC<ITableCell<T>>;
  CreatedAtCell?: FC<ITableCell<T>>;
  ActionsCell?: FC<ITableCell<T>>;
}

export interface IReportsTable extends Omit<ITable<IReportRecord>, 'rows'> {
  components?: IReportsTableComponents<IReportRecord>;
}

const mapper =
  ({
     state: { reports },
     config: { reportsConfig: { ReportsTable } },
   }: IFronteggMapper) => ({
    reports,
    config: ReportsTable,
  });

export class _ReportsTable extends React.Component<IReportsTable & ReturnType<typeof mapper>> {
  buildColumns(): ITableColumns<IReportRecord>[] {
    const { components, columns } = this.props;
    if (columns) {
      return columns;
    }
    return [
      {
        name: 'name',
        displayName: 'Title',
        sortable: true,
        filterable: true,
        Cell: components?.TitleCell ?? TableTitleCell(
          ({ description }) => description,
          ({ id }) => `/report/${id}`),
      },
      {
        name: 'schedule',
        displayName: 'Schedule',
        sortable: true,
        filterable: true,
        Cell: components?.ScheduleCell ?? TableActiveInactiveCell(data => data.schedule?.active ?? false),
      },
      {
        name: 'updatedAt',
        displayName: 'Last Generations',
        sortable: true,
        filterable: true,
        Cell: components?.LastGenerationsCell ?? TableDateCell,
      },
      {
        name: 'createdAt',
        displayName: 'Created At',
        sortable: true,
        filterable: true,
        Cell: components?.CreatedAtCell ?? TableDateCell,
      },
      // {
      //   name: 'id',
      //   displayName: '',
      //   isSortable: false,
      //   isFiltarable: false,
      //   Cell: components?.ActionsCell ?? ReportsTableCols.ReportActionsCell,
      // },
    ];
  }

  render() {
    const { reports, classes } = this.props;
    const tableProps: ITable<IReportRecord> = {
      columns: this.buildColumns(),
      rows: reports.data,
      classes,
    };
    return <Table {...tableProps}/>;
  }
}

export const ReportsTable = connectFrontegg(_ReportsTable, mapper);
