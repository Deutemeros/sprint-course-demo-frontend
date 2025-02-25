import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Field, MathFigure } from '../../model';
import { createField, deleteField, getFieldByID, getFigureByFieldID, updateField } from '../../hooks/figures';
import { Button, Form, FormProps, Input, Layout, Modal, Table, Typography } from 'antd';
import { Link } from 'react-router-dom';


export const FieldForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm<Field>();
  const [figures, setFigures] = useState<MathFigure[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (id === undefined || id === '0') {
      return
    }
    getFieldByID(id).then(field => {
      if (field === undefined) {
        console.error(`no entity with id=${id}`);
        return;
      }
      form.setFieldsValue(field);
    });
  }, [id, form])

  useEffect(() => {
    if (id === undefined || id === '0') {
      return
    }
    getFigureByFieldID(id).then(figures => {
      if (figures === undefined) {
        console.error(``);
        return;
      }
      setFigures(figures);
    });
  }, [id, form])

  if (id === undefined) {
    return <>Invalid ID</>
  }

  const onFinish: FormProps<Field>['onFinish'] = (values) => {
    if (id === '0') {
      createField({
        name: values.name
      } as Field).then(field => {
        navigate(`/field/${field.id}`);
      });
    } else {
      updateField({
        id: id,
        name: values.name
      } as Field).then(field => {
        form.setFieldsValue(field);
      });
    }
  };

  const onFinishFailed: FormProps<Field>['onFinishFailed'] = (errorInfo) => {
    console.error('Failed:', errorInfo);
  };


  const onDeleteClick = () => {
    setIsModalOpen(true);
  }

  const onDeleteConfirm = () => {
    deleteField(id).then(() => navigate("/field"))
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (value: string, record: MathFigure, index: number) => <Link to={`/figure/${record.id}`}>{value}</Link>
    },
    {
      title: 'Field',
      dataIndex: 'field',
      key: 'field',
      render: (value: Field, record: MathFigure, index: number) => <Link to={`/field/${record.field.id}`}>{value.name}</Link>
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
  ];

  return <Layout>
    <Layout.Header style={{ backgroundColor: '#e0e0e0', display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
      <Typography style={{ marginRight: 'auto' }}>
        <Typography.Title level={2}>
          {form.getFieldValue("name")}
        </Typography.Title>
      </Typography>
      <Button color='danger' variant="solid" onClick={onDeleteClick}>Delete</Button>
    </Layout.Header>
    <Layout.Content>
      <Form
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 20 }}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item<Field>
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
    <Modal title="Are you sure" open={isModalOpen} onOk={onDeleteConfirm} onCancel={() => setIsModalOpen(false)}>
      <p>Are you sure</p>
    </Modal>
  </Layout>
}