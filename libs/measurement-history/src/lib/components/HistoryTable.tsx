import { Table } from 'antd';
import React from 'react';
import { DataType, useHistoricTableColumns } from './useHistoricTableColumns';

interface HistoryTableProps {
  data: DataType[] | undefined;
  isLoading: boolean;
}

export const HistoryTable = ({ data, isLoading }: HistoryTableProps) => {
  const { columns } = useHistoricTableColumns({ data });

  return <Table scroll={{ y: 250, x: 500 }} columns={columns} dataSource={data} loading={isLoading} />;
};
