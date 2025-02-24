import React, { useEffect, useState } from 'react';
import { getAllFields } from '../../hooks/figures';
import { Button, Layout, Table, TableColumnsType } from 'antd';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

interface DataType {
  key: string;
  name: string;
}

export const Fields = () => {
  const navigate = useNavigate();
  const [fields, setFields] = useState<DataType[]>();

  useEffect(() => {
    getAllFields().then(fields => {
      const data = fields.map(f => ({
        ...f,
        key: '' + f.id,
      }));
      return setFields(data);
    });
  }, [])

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (value: any, record: DataType, index: number) => <Link to={`/field/${record.key}`}>{value}</Link>
    }
  ];

  const onClickNewMathFigure = () => {
    navigate("/field/0");
  }

  return <Layout>
    <Layout.Header style={{backgroundColor: '#e0e0e0', display: 'flex', alignItems: 'center'}}>
      <Button onClick={onClickNewMathFigure} style={{ marginRight: '0px', marginLeft: 'auto' }}>Add New Field</Button>
    </Layout.Header>
    <Table dataSource={fields} columns={columns}/>
  </Layout>
}