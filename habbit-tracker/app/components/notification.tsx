'use client';

import React, {useState} from 'react';
import {Modal} from 'antd';

export default function Notification(props: {
  text: string;
  type: string;
  visible: boolean;
}) {
  return (
    <div>
      <Modal open={props.visible} title={props.type} footer={null}>
        <div>{props.text}</div>
      </Modal>
    </div>
  );
}
