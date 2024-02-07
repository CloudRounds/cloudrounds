import { createScheduleEvent, updateScheduleEvent } from '@/services/ScheduleEventService';
import { ScheduleEvent } from '@/types';
import { Button, DatePicker, Form, Input, Modal, Switch, message } from 'antd';
import moment from 'moment';
import { useEffect } from 'react';

interface EventManagementModalProps {
  isVisible: boolean;
  onClose: () => void;
  scheduleId: string;
  event?: ScheduleEvent;
}

const EventManagementModal: React.FC<EventManagementModalProps> = ({ isVisible, onClose, scheduleId, event }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (event && isVisible) {
      form.setFieldsValue({
        ...event,
        startTime: moment(event.startTime),
        endTime: moment(event.endTime),
        isAllDay: event.isAllDay
      });
    }
  }, [event, isVisible, form]);

  const handleSubmit = async (values: any) => {
    const eventData = {
      title: values.title,
      description: values.description,
      startTime: values.startTime.toISOString(),
      endTime: values.endTime.toISOString(),
      isAllDay: values.isAllDay || false,
      scheduleId
    };

    try {
      if (event) {
        await updateScheduleEvent(event.id, eventData);
        message.success('Event updated successfully');
      } else {
        await createScheduleEvent(eventData);
        message.success('Event created successfully');
      }
      onClose();
      form.resetFields();
    } catch (error) {
      message.error('An error occurred while submitting the event');
      console.error('Event submission error:', error);
    }
  };

  return (
    <Modal title='Manage Events' open={isVisible} onCancel={onClose} footer={null}>
      <Form form={form} layout='vertical' onFinish={handleSubmit}>
        <Form.Item name='title' label='Event Title' rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name='description' label='Description'>
          <Input.TextArea />
        </Form.Item>
        <Form.Item name='startTime' label='Start Time' rules={[{ required: true }]}>
          <DatePicker showTime={{ format: 'HH:mm' }} format='YYYY-MM-DD HH:mm' />
        </Form.Item>
        <Form.Item name='endTime' label='End Time' rules={[{ required: true }]}>
          <DatePicker showTime={{ format: 'HH:mm' }} format='YYYY-MM-DD HH:mm' />
        </Form.Item>
        <Form.Item name='isAllDay' label='All Day Event' valuePropName='checked'>
          <Switch className='toggle-switch' />
        </Form.Item>
        <Form.Item>
          <Button type='primary' ghost htmlType='submit' className='primary-button'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EventManagementModal;
