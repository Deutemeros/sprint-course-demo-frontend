import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Field, MathFigure } from '../../model';
import { createFigure, deleteFigure, getAllFields, getFigureByID, updateFigure } from '../../hooks/figures';
import { Button, Form, FormProps, Input, Layout, Modal, Select, Typography } from 'antd';
import { DefaultOptionType } from 'antd/es/select';

interface FieldType {
  name: string
  url?: string
  description?: string
  fieldId: number
}

export const FigureForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [fields, setFields] = useState<DefaultOptionType[]>([]);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (id === undefined || id === '0') {
      return
    }
    getFigureByID(id).then(figure => {
      if (figure === undefined) {
        console.error(`no entity with id=${id}`);
        return;
      }
      form.setFieldsValue(figure);
    });
  }, [id, form])

  useEffect(() => {
    getAllFields().then(fields => setFields(fields.map(f => ({
      value: f.id,
      label: f.name,
    }))));
  }, [])

  if (id === undefined) {
    return <>Invalid ID</>
  }

  const onDeleteClick = () => {
    setIsModalOpen(true);
  }

  const onDeleteConfirm = () => {
    deleteFigure(id).then(() => navigate("/figure"))
  }

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    if (id === '0') {
      createFigure(values).then(figure => {
        navigate(`/figure/${figure.id}`);
      });
    } else {
      updateFigure({
        id: id,
        ...values
      }).then(figure => {
        form.setFieldsValue(figure);
      });
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.error('Failed:', errorInfo);
  };

  return <Layout>
    <Layout.Header style={{ backgroundColor: '#e0e0e0', display: 'flex', flexDirection: 'row', alignItems: 'center',  }}>
      <Typography style={{marginRight: 'auto'}}>
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
        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Name is required' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Description"
          name="description"
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="URL"
          name="url"
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Fields"
          name="fieldId"
          rules={[{ required: true, message: 'Field is required' }]}
        >
          <Select<Field>
            options={fields}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType='submit'>Submit</Button>
        </Form.Item>
      </Form>
    </Layout.Content>
    <Modal title="Are you sure" open={isModalOpen} onOk={onDeleteConfirm} onCancel={() => setIsModalOpen(false)}>
      <p>Are you sure</p>
    </Modal>
  </Layout>
}