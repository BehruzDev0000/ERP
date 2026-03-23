import React from 'react';
import { Table, Empty } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const CustomTable: React.FC<{ columns: any[], data: any[], loading: boolean }> = ({ columns, data, loading }) => (
  <div className="bg-card rounded-xl border border-border overflow-hidden">
    <Table
      loading={loading}
      columns={columns}
      dataSource={data}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showTotal: (total) => `Jami ${total} ta`,
        className: 'px-4 py-3'
      }}
      locale={{
        emptyText: (
          <Empty
            image={<InboxOutlined className="text-5xl text-muted-foreground" />}
            description={<span className="text-muted-foreground">Ma'lumot topilmadi</span>}
          />
        )
      }}
      scroll={{ x: true }}
    />
  </div>
);

export default CustomTable;
