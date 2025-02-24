import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Field, MathFigure } from '../../model';
import { getAllFields, getFigureByID } from '../../hooks/figures';
import { Button, Form, FormProps, Input, Layout, Select } from 'antd';

type FieldType = {
  name?: string;
  description?: string;
  url?: string;
  fields?: Field[];
};

export const FigureForm = () => {
  const { id } = useParams();
  const intID = id ? parseInt(id) : undefined;
  const [figure, setFigure] = useState<MathFigure>();
  const [fields, setFields] = useState<Field[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (intID === undefined || intID === 0) {
      return
    }
    getFigureByID(intID).then(figure => setFigure(figure));
  }, [intID])

  useEffect(() => {
    getAllFields().then(fields => setFields(fields));
  }, [])

  if (intID === undefined) {
    return <>Invalid ID</>
  }

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    if (id === '0') {

    }
  };

  const fieldsSelect = (field: Field) => {
    console.log(field)
  }

  return <Layout>
    <Layout.Header style={{ backgroundColor: '#e0e0e0' }}>
      {figure?.name}
    </Layout.Header>
    <Layout.Content>
      <Form
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 20 }}
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
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
          name="fields"
        >
          <Select<Field>
            mode="multiple"
            allowClear
            onChange={fieldsSelect}
            options={fields}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary">Submit</Button>
        </Form.Item>
      </Form>
    </Layout.Content>
  </Layout>
}