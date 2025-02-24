import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Field } from '../../model';
import { createField, getFieldByID, updateField } from '../../hooks/figures';
import { Button, Form, FormProps, Input, Layout, Table } from 'antd';


export const FieldForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const intID = id ? parseInt(id) : undefined;
  const [form] = Form.useForm<Field>();

  useEffect(() => {
    if (intID === undefined || intID === 0) {
      return
    }
    getFieldByID(intID).then(field => {
      if (field === undefined) {
        console.error(`no entity with id=${intID}`);
        return ;
      }
      form.setFieldsValue(field);
    });
  }, [intID, form])

  if (intID === undefined) {
    return <>Invalid ID</>
  }

  const onFinish: FormProps<Field>['onFinish'] = (values) => {
    console.log('Success:', values);
    if (id === '0') {
      createField({
        name: values.name
      } as Field).then(field => {
        navigate(`/field/${field.id}`);
      });
    } else {
      updateField({
        id: intID,
        name: values.name
      } as Field).then(field => {
        form.setFieldsValue(field);
      });
    }
  };
  
  const onFinishFailed: FormProps<Field>['onFinishFailed'] = (errorInfo) => {
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
      {form.getFieldValue("name")}
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

      <Table dataSource={form.getFieldValue("mathFigure")} columns={columns} />
    </Layout.Content>
  </Layout>
}