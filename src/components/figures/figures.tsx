import React, { useEffect, useState } from 'react';
import { Field } from '../../model';
import { getAllFigures } from '../../hooks/figures';
import { Button, Layout, Table } from 'antd';
import { useNavigate } from 'react-router';

interface DataType {
  key: string;
  name: string;
  description?: string;
  field: Field[];
}

export const Figures = () => {
  const navigate = useNavigate();
  const [figures, setFigures] = useState<DataType[]>();

  useEffect(() => {
    getAllFigures().then(figures => {
      console.log(figures);
      const data = figures.map(f => ({
        ...f,
        key: '' + f.id,
      }));
      return setFigures(data);
    });
  }, [])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Field',
      dataIndex: 'field',
      key: 'field',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
  ];

  const onClickNewMathFigure = () => {
    navigate("/figures/0");
  }

  return <Layout>
    <Layout.Header style={{backgroundColor: '#e0e0e0', display: 'flex', alignItems: 'center'}}>
      <Button onClick={onClickNewMathFigure} style={{ marginRight: '0px', marginLeft: 'auto' }}>Add New Math Figure</Button>
    </Layout.Header>
    <Table dataSource={figures} columns={columns} />
  </Layout>
}