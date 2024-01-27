import { List } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { User } from '@/types';

interface UserListProps {
  users: User[];
  setTargetKeys: (updater: (prev: string[]) => string[]) => void;
  setDeltaTargetKeys: (updater: (prev: string[]) => string[]) => void;
}

const UserList = ({ users, setTargetKeys, setDeltaTargetKeys }: UserListProps) => {
  const handleAddUser = (userId: string) => {
    setTargetKeys(prevKeys => [...prevKeys, userId]);
    setDeltaTargetKeys(prev => [...prev, userId]);
  };

  return (
    <List
      className='custom-list'
      dataSource={users}
      renderItem={user => (
        <List.Item
          key={user.id}
          actions={[
            <UserAddOutlined
              className='text-xl text-blue-300 hover:text-blue-500'
              onClick={() => handleAddUser(user.id)}
            />
          ]}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {user.username}
            <br />
            <i style={{ fontSize: 'smaller' }}>{user.email}</i>
          </div>
        </List.Item>
      )}
    />
  );
};

export default UserList;
