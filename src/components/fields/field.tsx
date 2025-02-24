import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Field, MathFigure } from '../../model';
import { createField, getFieldByID, getFigureByFieldID, updateField } from '../../hooks/figures';
import { Button, Form, FormProps, Input, Layout, Table } from 'antd';

type FieldType = {
  name?: string;
};

export const FieldForm = () => {
  const { id } = useParams();
  const intID = id ? parseInt(id) : undefined;
  const [field, setField] = useState<Field>();
  const [figures, setFigures] = useState<MathFigure[]>([]);
  const [form] = Form.useForm<FieldType>();

  useEffect(() => {
    if (intID === undefined || intID === 0) {
      return
    }
    getFieldByID(intID).then(field => setField(field));
  }, [intID])

  useEffect(() => {
    if (intID === undefined || intID === 0) {
      return
    }
    getFigureByFieldID(intID).then(figures => setFigures(figures ?? []));
  }, [intID])

  if (intID === undefined) {
    return <>Invalid ID</>
  }

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    if (id === '0') {
      createField({
        name: values.name
      } as Field);
    } else {
      updateField({
        id: intID,
        name: values.name
      } as Field);
    }
  };
  
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

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

  return <Layout>
    <Layout.Header style={{ backgroundColor: '#e0e0e0' }}>
      {field?.name}
    </Layout.Header>
    <Layout.Content>
      <Form
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 20 }}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Name is required' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType='submit'>Submit</Button>
        </Form.Item>
      </Form>

      <Table dataSource={figures} columns={columns} />
    </Layout.Content>
  </Layout>
}