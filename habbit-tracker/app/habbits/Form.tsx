"use client";

import React from "react";
import { Button, Checkbox, ColorPicker, Form, Input } from "antd";

type FieldType = {
  habbit: string;
  description: string;
  frequency: string;
  startDate: string;
  endDate: string;
  color: string;
};

export default function HabbitForm() {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Habbit"
          name="habbit"
          rules={[{ required: true, message: "Please input your habbit!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Please input your description!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Frequency"
          name="frequency"
          rules={[{ required: true, message: "Please input your frequency!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Start Date"
          name="startDate"
          rules={[{ required: true, message: "Please input your start date!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="End Date"
          name="endDate"
          rules={[{ required: true, message: "Please input your end date!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Color"
          name="color"
          rules={[{ required: true, message: "Please input your color!" }]}
        >
          <ColorPicker showText />
        </Form.Item>
        <Form.Item>
          <Button type="default" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
