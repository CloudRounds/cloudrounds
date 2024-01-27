import { Calendar } from '@/types';
import { DeleteOutlined, EditOutlined, UserSwitchOutlined, UsergroupDeleteOutlined } from '@ant-design/icons';
import { ColumnProps } from 'antd/es/table';

type OpenHandler = (record?: Calendar | null, field?: 'name' | 'description' | null) => void;
type OpenMemberListHandler = (record: Calendar) => void;
type LeaveHandler = (calendar: Calendar) => void;
type DeleteHandler = (record: string) => void;

export const getColumns = (
  handleOpen: OpenHandler,
  handleOpenMemberList: OpenMemberListHandler,
  handleLeave: DeleteHandler
): ColumnProps<Calendar>[] => {
  return [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <>
          {text} <EditOutlined className='cursor-pointer' onClick={() => handleOpen(record, 'name')} />
        </>
      )
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text, record) => (
        <>
          {text} <EditOutlined className='cursor-pointer' onClick={() => handleOpen(record, 'description')} />
        </>
      )
    },
    {
      title: 'Edit Members',
      key: 'editMembers',
      width: '18%',
      render: (text, record) => (
        <UserSwitchOutlined
          onMouseEnter={e => (e.currentTarget.style.color = 'blue')}
          onMouseLeave={e => (e.currentTarget.style.color = 'inherit')}
          className='cursor-pointer text-lg'
          onClick={() => handleOpenMemberList(record)}
        />
      )
    },
    {
      title: 'Delete',
      key: 'delete',
      render: (text, record) => (
        <DeleteOutlined
          onMouseEnter={e => (e.currentTarget.style.color = 'red')}
          onMouseLeave={e => (e.currentTarget.style.color = 'inherit')}
          onClick={() => handleLeave(record.id)}
          className='cursor-pointer text-lg'
        />
      )
    }
  ];
};

export const getMemberColumns = (handleLeave: LeaveHandler): ColumnProps<Calendar>[] => {
  return [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <>{text}</>
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text, record) => <>{text}</>
    },
    {
      title: 'Leave',
      key: 'leave',
      width: '34%',
      render: (text, record) => (
        <UsergroupDeleteOutlined
          onMouseEnter={e => (e.currentTarget.style.color = 'red')}
          onMouseLeave={e => (e.currentTarget.style.color = 'inherit')}
          onClick={() => handleLeave(record)}
          className='cursor-pointer text-xl'
        />
      )
    }
  ];
};
