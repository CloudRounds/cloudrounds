import { removeUserFromCalendar } from '@/services/CalendarService';
import { Calendar, User } from '@/types';
import { HourglassOutlined, UserDeleteOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { List, Modal } from 'antd';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface CurrentMembersListProps {
  members: User[];
  hasPendingRequest: (userId: string, calendar: Calendar) => boolean;
  selectedCalendar: Calendar;
  setTargetKeys: (updater: (prev: string[]) => string[]) => void;
  deltaTargetKeys: string[];
  setDeltaTargetKeys: (updater: (prev: string[]) => string[]) => void;
  handleRemovePendingUser: (user: User) => void;
}

const CurrentMembersList = ({
  members,
  hasPendingRequest,
  selectedCalendar,
  setTargetKeys,
  deltaTargetKeys,
  setDeltaTargetKeys,
  handleRemovePendingUser
}: CurrentMembersListProps) => {
  const handleUndoAddmember = (userId: string) => {
    setTargetKeys(prev => prev.filter(key => key !== userId));
    setDeltaTargetKeys(prev => prev.filter(key => key !== userId));
  };

  const [hoveredUser, setHoveredUser] = useState<User | null>(null);

  const handleRemoveUser = async (user: User) => {
    Modal.confirm({
      title: 'Are you sure you want to remove this member?',
      content: `This will remove ${user.username} from ${selectedCalendar.name}.`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await removeUserFromCalendar(selectedCalendar.name, user.id);
          toast.success(`Success: Removed ${user.username} from ${selectedCalendar.name}.`, {
            autoClose: 1500,
            pauseOnFocusLoss: false
          });
          setTargetKeys(prevKeys => prevKeys.filter(key => key !== user.id));
        } catch (error) {
          toast.error(`Error while removing ${user.username} from ${selectedCalendar.name}.`, {
            autoClose: 1500,
            pauseOnFocusLoss: false
          });
          console.error('Error removing user:', error);
        }
      },
      onCancel() {}
    });
  };

  const handleClickPending = async (item: User) => {
    handleRemovePendingUser(item);
  };

  const subscribers = members.filter(member => member.id !== selectedCalendar.creator.id);
  const halfLength = Math.ceil(subscribers.length / 2);
  const firstHalfSubscribers = subscribers.slice(0, halfLength);
  const secondHalfSubscribers = subscribers.slice(halfLength);

  const renderListItem = (item: User) => {
    const isRegisteredUser = typeof item === 'object';

    return (
      <List.Item
        key={isRegisteredUser ? item.id : item}
        actions={[
          isRegisteredUser ? (
            hasPendingRequest(item.id, selectedCalendar) ? (
              hoveredUser && hoveredUser.id === item.id ? (
                <UserDeleteOutlined
                  className='text-lg text-red-300 hover:text-red-500'
                  onMouseOver={() => setHoveredUser(item)}
                  onMouseOut={() => setHoveredUser(null)}
                  onClick={() => handleClickPending(item)}
                />
              ) : (
                <HourglassOutlined
                  className='text-lg text-gray-400'
                  onMouseOver={() => setHoveredUser(item)}
                  onClick={() => handleClickPending(item)}
                />
              )
            ) : deltaTargetKeys.includes(item.id) ? (
              <UserSwitchOutlined
                className='text-lg text-green-500 hover:text-red-600'
                onClick={() => handleUndoAddmember(item.id)}
              />
            ) : (
              <UserDeleteOutlined
                className='text-lg text-red-300 hover:text-red-500'
                onClick={() => handleRemoveUser(item)}
              />
            )
          ) : (
            <HourglassOutlined className='text-lg text-gray-400' />
          )
        ]}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', fontSize: '0.8rem' }}>
          {isRegisteredUser ? item.username : item}
          <br />
          <i style={{ fontSize: '11px' }}>{isRegisteredUser ? item.email : ''}</i>
        </div>
      </List.Item>
    );
  };

  return (
    <div className='flex flex-row justify-between h-full mx-4'>
      <List className='custom-list w-1/2' dataSource={firstHalfSubscribers} renderItem={renderListItem} />
      <div className='mx-6'></div>
      <List className='custom-list w-1/2' dataSource={secondHalfSubscribers} renderItem={renderListItem} />
    </div>
  );
};

export default CurrentMembersList;
