import { userRequestsState, userState } from '@/appState';
import { useRequestData } from '@/hooks/useRequestData';
import { deleteRequest, updateRequestStatus } from '@/services/RequestService';
import { Calendar, Request, User } from '@/types';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  HourglassOutlined,
  MoreOutlined
} from '@ant-design/icons';
import { Button, Card, Dropdown, Layout, Modal, Pagination, Spin, Table, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
const ButtonGroup = Button.Group;

const RequestsList = () => {
  const user = useRecoilValue(userState);

  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userRequests, setUserRequests] = useRecoilState(userRequestsState);
  const { requests, setRequests, isLoading: isQueryLoading, refetch } = useRequestData();
  const [showUserRequests, setShowUserRequests] = useState(true);
  const [isStatusUpdating, setIsStatusUpdating] = useState<string | null>(null);

  useEffect(() => {
    if (!isQueryLoading && user) {
      const requestsForUser = requests.filter(r => r.userId === user.id);
      setUserRequests(requestsForUser);
    }
  }, [isQueryLoading]);

  const deleteMutation = useMutation(deleteRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries('requests');
    },
    onError: error => {
      console.error('Error deleting request:', error);
    }
  });

  const handleDelete = (requestId: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this request?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteMutation.mutate(requestId);
      },
      onCancel() {
        return;
      }
    });
  };

  const updateStatusMutation = useMutation(
    async ({
      requestId,
      calendarId,
      status,
      message
    }: {
      requestId: string;
      calendarId: string;
      status: string;
      message: string;
    }) => {
      const requestToUpdate = {
        status,
        message,
        calendarId,
        email: user?.email || ''
      };
      return updateRequestStatus(requestId, requestToUpdate);
    },
    {
      onSuccess: (data, variables) => {
        const updatedRequests = requests.map(request => {
          if (request.id === variables.requestId) {
            return { ...request, status: variables.status, isApproving: false };
          }
          return request;
        });

        setRequests(updatedRequests);

        setUserRequests(updatedRequests.filter(r => r.user?.id === user?.id));
        refetch();
        setIsStatusUpdating(null);
        handleClose();
      },
      onError: (error, variables) => {
        console.error('There was an error updating the request:', error);
        setIsStatusUpdating(null);
        handleClose();
      }
    }
  );

  const handleClose = () => {
    setOpenMenuId(null);
  };

  const handleChangePage = (newPage: number, newRowsPerPage: number) => {
    setPage(newPage);
    setRowsPerPage(newRowsPerPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 25));
    setPage(0);
  };

  const toggleView = () => {
    setShowUserRequests(!showUserRequests);
  };

  const updateStatus = (id: string, calendarId: string | undefined, status: string, message: string) => {
    if (!calendarId) {
      console.error('Calendar ID is undefined.');
      return;
    }
    updateStatusMutation.mutate({ requestId: id, status, message, calendarId });
  };

  if (isQueryLoading || isLoading) {
    return (
      <div className='h-screen w-full items-center justify-center align-middle'>
        <Spin />
      </div>
    );
  }

  const displayedRequests = showUserRequests
    ? userRequests
    : requests.filter(r => r.userId !== user?.id && r.calendar?.creatorId === user?.id);

  const columns = [
    {
      title: 'Calendar',
      dataIndex: 'calendar',
      key: 'calendar',
      render: (calendar: Calendar) => <strong>{calendar && calendar.name}</strong>
    },
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      render: (user: User) => (
        <div>
          <p style={{ padding: 0, margin: 0, fontSize: '12px' }}>{user.username}</p>
          <span style={{ padding: 0, margin: 0, fontSize: '12px', color: 'blue' }}>{user.email}</span>
        </div>
      )
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      render: (text: string) => <strong>{text}</strong>
    },
    ...(!showUserRequests
      ? [
          {
            title: 'Actions',
            key: 'actions',
            render: (text: string, request: Request) => {
              const menuItems = [
                {
                  key: 'approve',
                  label: 'Approve',
                  disabled: request.status === 'Approved',
                  onClick: () => updateStatus(request.id, request.calendar?.id, 'Approved', '')
                },
                {
                  key: 'deny',
                  label: 'Deny',
                  disabled: request.status === 'Denied',
                  onClick: () => updateStatus(request.id, request.calendar?.id, 'Denied', '')
                },
                {
                  key: 'reset',
                  label: 'Reset',
                  disabled: request.status === 'Pending',
                  onClick: () => updateStatus(request.id, request.calendar?.id, 'Pending', '')
                }
              ];

              return isStatusUpdating === request.id ? (
                <Spin className='ml-1' />
              ) : (
                <Dropdown menu={{ items: menuItems }} trigger={['click']}>
                  <Button icon={<MoreOutlined />} />
                </Dropdown>
              );
            }
          }
        ]
      : [
          {
            title: 'Actions',
            key: 'actions',
            render: (text: string, request: Request) => {
              const menuItems = [
                {
                  key: 'approve',
                  label: 'Approve',
                  disabled: request.status === 'Approved',
                  onClick: () => updateStatus(request.id, request.calendar?.id, 'Approved', '')
                },
                {
                  key: 'deny',
                  label: 'Deny',
                  disabled: request.status === 'Denied',
                  onClick: () => updateStatus(request.id, request.calendar?.id, 'Denied', '')
                }
              ];

              return isStatusUpdating === request.id ? (
                <Spin className='ml-1' />
              ) : (
                <Dropdown menu={{ items: menuItems }} trigger={['click']}>
                  <Button icon={<MoreOutlined />} />
                </Dropdown>
              );
            }
          }
        ]),
    {
      title: 'Status',
      key: 'status',
      width: '15%',
      render: (text: string, request: Request) => {
        if (request.status === 'Denied') {
          return <CloseCircleOutlined style={{ color: 'indianred' }} />;
        } else if (request.status === 'Pending') {
          return <HourglassOutlined style={{ color: 'goldenrod' }} />;
        } else {
          return <CheckCircleOutlined style={{ color: 'green' }} />;
        }
      }
    },
    {
      title: 'Delete',
      key: 'delete',
      width: '20%',
      render: (text: string, request: Request) => (
        <Button
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(request.id)}
          danger
          className='hover:bg-red-500 cancel-request-btn'
        />
      )
    }
  ];

  return (
    <Layout>
      <Card bordered={false} className='w-full text-center'>
        <div className='w-full bg-white p-6 min-h-[280px] text-center full-width-mobile'>
          <ButtonGroup>
            <Button onClick={toggleView} className='mb-5' disabled={!showUserRequests}>
              Invitations Sent
            </Button>
            <Button onClick={toggleView} className='mb-5' disabled={showUserRequests}>
              Invitations Received
            </Button>
          </ButtonGroup>
          <hr className='my-5' />
          <Typography.Title level={2} className='mb-5'>
            {showUserRequests ? 'Invitations Received' : 'Invitations Sent'}
          </Typography.Title>
          <Table
            dataSource={
              rowsPerPage > 0
                ? displayedRequests.slice((page - 1) * rowsPerPage, page * rowsPerPage)
                : displayedRequests
            }
            pagination={false}
            rowKey={record => record.id}
            columns={columns}
            scroll={{ x: 'max-content' }}
            className='w-full overflow-x-auto'
          />
          <Pagination
            total={userRequests.length}
            pageSize={rowsPerPage}
            current={page}
            onChange={handleChangePage}
            showSizeChanger
            pageSizeOptions={['25', '50', '100']}
            className='mt-5'
          />
        </div>
      </Card>
    </Layout>
  );
};

export default RequestsList;
