import React, { useState, useEffect } from 'react';
import { Modal, Input, Form, Select, Button, message } from 'antd';
import { useRecoilState } from 'recoil';
import { schedulesState } from '@/appState'; // Adjust import path as necessary
import { createSchedule } from '@/services/ScheduleService'; // Adjust import path as necessary
import { fetchSchedules } from '@/services/ScheduleService'; // Adjust import path as necessary
import { Schedule } from '@/types'; // Adjust import path as necessary
import { useUser } from '@/hooks/useUser';

const ScheduleManagement: React.FC = () => {
  const { user } = useUser();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [schedules, setSchedules] = useRecoilState<Schedule[] | null>(schedulesState);

  useEffect(() => {
    if (isModalVisible && schedules === null) {
      (async () => {
        try {
          const loadedSchedules = await fetchSchedules();
          setSchedules(loadedSchedules);
        } catch (error) {
          console.error('Failed to load schedules', error);
        }
      })();
    }
  }, [isModalVisible, schedules, setSchedules]);

  const handleSubmit = async (values: any) => {
    if (values.scheduleId === 'new') {
      try {
        const newSchedule = await createSchedule({
          name: values.name,
          description: values.description,
          userId: user.id
        });
        message.success('Schedule created successfully');
        if (schedules) {
          setSchedules([...schedules, newSchedule]);
        } else {
          setSchedules([newSchedule]);
        }
      } catch (error) {
        console.error('Failed to create schedule', error);
        message.error('Failed to create schedule');
      }
    } else {
      // For adding tasks to an existing schedule, adjust as needed or integrate with CmdKInput logic
    }

    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <>
      <Modal title='Manage Schedule' open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
        <Form form={form} layout='vertical' onFinish={handleSubmit}>
          <Form.Item name='name' label='Schedule Name' rules={[{ required: true }]}>
            <Input placeholder='Enter schedule name' />
          </Form.Item>
          <Form.Item name='description' label='Description'>
            <Input.TextArea rows={4} placeholder='Describe the schedule' />
          </Form.Item>
          <Form.Item name='scheduleId' label='Select Schedule' initialValue='new'>
            <Select>
              {schedules?.map(schedule => (
                <Select.Option key={schedule.id} value={schedule.id}>
                  {schedule.name}
                </Select.Option>
              ))}
              <Select.Option value='new'>+ Create New Schedule</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ScheduleManagement;
