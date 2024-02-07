import { Modal, Form, Input, Button, message, Spin } from 'antd';
import { useSchedule } from '@/contexts/ScheduleContext';
import { createSchedule } from '@/services/ScheduleService';
import { useUser } from '@/hooks/useUser';
import { useSetRecoilState } from 'recoil';
import { schedulesRefetchTrigger } from '@/appState';
import { useMutation } from 'react-query';

const ScheduleModal: React.FC = () => {
  const { user } = useUser();
  const setRefetchTrigger = useSetRecoilState(schedulesRefetchTrigger);
  const { isScheduleModalOpen, setScheduleModalOpen, currentTask } = useSchedule();
  const [form] = Form.useForm();

  const { mutate: createScheduleMutation, isLoading } = useMutation(createSchedule, {
    onSuccess: () => {
      message.success('Schedule created successfully');
      form.resetFields();
      setRefetchTrigger(currentValue => currentValue + 1);
      setScheduleModalOpen(false);
    },
    onError: error => {
      message.error('Failed to create schedule');
      console.log('Failed:', error);
    }
  });

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      createScheduleMutation({ ...values, userId: user.id });
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  const handleCancel = () => {
    setScheduleModalOpen(false);
  };

  return (
    <Modal
      title='Select or Create Schedule'
      open={isScheduleModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}>
      <Form form={form} layout='vertical' onFinish={handleOk}>
        <Form.Item
          name='name'
          label='Schedule Name'
          rules={[{ required: true, message: 'Please input the schedule name!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name='description' label='Description'>
          <Input.TextArea />
        </Form.Item>
        {isLoading ? (
          <Spin />
        ) : (
          <Form.Item>
            <Button ghost className='submit-blue-button' htmlType='submit'>
              Create Schedule
            </Button>
          </Form.Item>
        )}
      </Form>
      <p>
        Press <strong>Cmd+K</strong> to add tasks via AI.
      </p>
    </Modal>
  );
};

export default ScheduleModal;
