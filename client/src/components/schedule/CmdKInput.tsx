// CmdKInput.tsx
import { schedulesRefetchTrigger } from '@/appState';
import { useSchedule } from '@/contexts/ScheduleContext';
import { useUser } from '@/hooks/useUser';
import { createScheduleEvent } from '@/services/ScheduleEventService';
import { createSchedule } from '@/services/ScheduleService';
import { Task } from '@/types';
import { Button, Input, Modal, Spin, message } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

const CmdKInput: React.FC = () => {
  const { user } = useUser();
  const [taskDescription, setTaskDescription] = useState('');
  const { setCurrentTask, isTaskModalOpen, setTaskModalOpen } = useSchedule();
  const [refetchTriggerValue, setRefetchTrigger] = useRecoilState(schedulesRefetchTrigger);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOk = async () => {
    if (!taskDescription.trim()) {
      message.error('Task description cannot be empty');
      return;
    }
    await createTaskAndSchedule();
  };

  const createTaskAndSchedule = async () => {
    setIsSubmitting(true);
    try {
      const openAIResponse = await axios.post('http://localhost:3003/api/openai/parse-task', {
        description: taskDescription
      });

      message.success('Task added successfully');
      const createdTask = openAIResponse.data;
      setCurrentTask(createdTask);

      await createScheduleForTask(createdTask);
      message.success('Schedule and events created successfully');
      setRefetchTrigger(refetchTriggerValue + 1);
    } catch (error) {
      console.error('Failed to create task and schedule:', error);
      message.error('Failed to create task and schedule');
    } finally {
      setIsSubmitting(false);
      setTaskModalOpen(false);
      setTaskDescription('');
    }
  };

  const createScheduleForTask = async (createdTask: Task) => {
    const { title, goal, repeat, frequency, startDate, endDate, startTime, endTime } = createdTask;

    const duration = createdTask.duration || '1h';
    const durationInMinutes = parseInt(duration.replace(/\D/g, ''), 10) * 60;

    const schedule = await createSchedule({
      name: title,
      description: goal,
      userId: user.id,
      startDate: new Date(startDate || ''),
      endDate: new Date(endDate || '')
    });

    const eventData = {
      scheduleId: schedule.id,
      title,
      description: goal,
      startTime,
      endTime,
      duration: durationInMinutes,
      isAllDay: false,
      repeat,
      frequency,
      endDate,
      userId: user.id
    };

    await createScheduleEvent(eventData);

    console.log('Schedule and recurring event created successfully.');
  };

  return (
    <>
      <Modal
        title='Add New Task'
        open={isTaskModalOpen}
        onOk={handleOk}
        onCancel={() => setTaskModalOpen(false)}
        footer={[
          <Button key='back' onClick={() => setTaskModalOpen(false)}>
            Cancel
          </Button>,
          <Button key='submit' type='primary' loading={isSubmitting} onClick={handleOk}>
            Submit
          </Button>
        ]}>
        {isSubmitting ? (
          <Spin tip='Processing...'>
            <Input
              placeholder='Enter task description'
              value={taskDescription}
              onChange={e => setTaskDescription(e.target.value)}
              disabled
            />
          </Spin>
        ) : (
          <Input
            placeholder='Enter task description'
            value={taskDescription}
            onChange={e => setTaskDescription(e.target.value)}
            onPressEnter={handleOk}
          />
        )}
      </Modal>
    </>
  );
};

export default CmdKInput;
