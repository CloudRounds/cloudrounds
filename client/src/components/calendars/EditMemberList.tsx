import { useState, useEffect } from 'react';
import { Modal, Button, Spin, Pagination, AutoComplete } from 'antd';
import { useQuery, useMutation } from 'react-query';
import { fetchUsers } from '@/services/users/UserService';
import { fetchRequests, createRequest, createBulkRequests } from '@/services/requests/RequestService';
import { toast } from 'react-toastify';
import InviteByEmail from './InviteByEmail';
import CurrentMembersList from './components/CurrentMembersList';
import { RiAdminFill } from 'react-icons/ri';
import { deleteRequest } from '@/services/requests/RequestService';
import { Calendar, User, Request } from '@/types';

interface EditMemberListProps {
  open: boolean;
  handleClose: () => void;
  refetchCalendars: () => void;
  selectedCalendar: Calendar | null;
  setSelectedCalendar: (calendar: Calendar) => void;
}

interface UserOption {
  label: string;
  value: string;
}

const EditMemberList = ({
  open,
  handleClose,
  refetchCalendars,
  selectedCalendar,
  setSelectedCalendar
}: EditMemberListProps) => {
  const { data: users, isLoading: isLoadingUsers } = useQuery('users', fetchUsers);
  const {
    data: fetchedRequests,
    isLoading: isRequestsLoading,
    refetch: refetchRequests
  } = useQuery('requests', fetchRequests);

  const [requests, setRequests] = useState<Request[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [deltaTargetKeys, setDeltaTargetKeys] = useState<string[]>([]);
  const [isEmailModalOpen, setEmailModalOpen] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [options, setOptions] = useState<UserOption[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 9;

  const createRequestMutation = useMutation(
    ({ calendarId, userId }: { calendarId: string; userId: string }) => createRequest(calendarId, userId),
    {
      onSuccess: (data: any) => {
        setRequests(prevRequests => [...prevRequests, data.request]);
        toast.success(`Request for ${data.request.user.username} has been created.`, {
          autoClose: 1500,
          pauseOnFocusLoss: false
        });
      },
      onError: (error: any) => {
        toast.error(`Error creating request: ${error.message}`, {
          autoClose: 1500,
          pauseOnFocusLoss: false
        });
        console.error('Error creating request:', error);
      }
    }
  );

  useEffect(() => {
    if (selectedCalendar) {
      const members = selectedCalendar.canReadMembers.map(u => u.id);
      setTargetKeys(members);
    }
  }, [selectedCalendar]);

  useEffect(() => {
    if (fetchedRequests) {
      setRequests(fetchedRequests);
    }
  }, [fetchedRequests]);

  const onSelect = (userId: string) => {
    setTargetKeys(prevKeys => [...prevKeys, userId]);
    setDeltaTargetKeys(prev => [...prev, userId]);
    setSearchValue('');
  };

  const onSearch = (search: string) => {
    if (!selectedCalendar) return;

    setSearchValue(search);
    const availablemembers = users
      .filter((u: User) => !targetKeys.includes(u.id))
      .filter((u: User) => !hasPendingRequest(u.id, selectedCalendar));
    const value = search.toLowerCase();

    const filteredUsers = availablemembers
      .filter((user: User) => {
        return (
          (user.username.substring(0, user.email.indexOf('@')).toLowerCase().includes(value) && value.length >= 3) ||
          (user.email.substring(0, user.email.indexOf('@')).includes(value) && value.length >= 5)
        );
      })
      .slice(0, 5)
      .map((user: User) => ({
        ...user,
        value: user.id,
        label: `${user.username} (${user.email})`
      }));
    setOptions(filteredUsers);
  };

  const createBulkRequestMutation = useMutation(
    (args: { userIds: string[]; calendarId: string }) => createBulkRequests(args.userIds, args.calendarId),
    {
      onSuccess: data => {
        setRequests(prevRequests => [...prevRequests, ...data.requests]);
        toast.success(`Requests for ${data.requests.length} users have been created.`, {
          autoClose: 1500,
          pauseOnFocusLoss: false
        });
      },
      onError: (error: any) => {
        toast.error(`Error creating requests: ${error.message}`, {
          autoClose: 1500,
          pauseOnFocusLoss: false
        });
        console.error('Error creating requests:', error);
      }
    }
  );

  const handleSave = async () => {
    setIsSaving(true);
    if (!selectedCalendar) return;
    try {
      await createBulkRequestMutation.mutateAsync({ userIds: deltaTargetKeys, calendarId: selectedCalendar.id });
      setDeltaTargetKeys([]);
      refetchCalendars();
    } catch (error: any) {
      toast.error(`Error creating requests: ${error.message}`);
      console.error('Error creating requests:', error);
    } finally {
      setIsSaving(false);
      handleModalClose();
    }
  };

  const handleRemovePendingUser = async (user: User) => {
    if (!selectedCalendar) return;
    const calendarRequests = requests.filter(r => r.user.id === user.id);
    const request = calendarRequests.find(r => r.calendar.name === selectedCalendar.name);
    if (!request) return;
    Modal.confirm({
      title: 'Are you sure you want to remove the pending member?',
      content: `This will remove ${user.username} from ${selectedCalendar.name}.`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await deleteRequest(request.id);
          toast.success(`Success: Removed ${user.username} from ${selectedCalendar.name}.`, {
            autoClose: 1500,
            pauseOnFocusLoss: false
          });
          setRequests(prevRequests => prevRequests.filter(req => req.id !== request.id));
          setTargetKeys(prevKeys => prevKeys.filter(key => key !== user.id));
          await refetchRequests();
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

  const handleModalClose = () => {
    setOptions([]);
    handleClose();
    setCurrentPage(1);
  };

  if (isLoadingUsers) {
    return <Spin />;
  }

  const hasPendingRequest = (userId: string, calendar: Calendar) => {
    if (!calendar) return false;
    if (isRequestsLoading) {
      return false;
    }
    return requests.some(
      request =>
        request.user.id === userId &&
        request.calendar &&
        request.calendar.name === calendar.name &&
        request.status === 'Pending'
    );
  };

  if (!selectedCalendar) return;
  const currentMembers = users.filter(
    (user: User) => targetKeys.includes(user.id) || hasPendingRequest(user.id, selectedCalendar)
  );

  const unregisteredEmails = selectedCalendar
    ? selectedCalendar.emailMembers.filter(emailMember => !users.some((user: User) => user.email === emailMember.email))
    : [];

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentAndUnregistered = [...currentMembers, ...unregisteredEmails];

  const paginatedMembers = currentAndUnregistered.slice(startIndex, startIndex + itemsPerPage);

  const FooterButtons = () => (
    <div key='buttons' className='mb-3'>
      <Button key='back' onClick={handleModalClose}>
        Cancel
      </Button>
      <Button key='submit' ghost className='submit-blue-button' type='primary' onClick={handleSave}>
        Save
      </Button>
    </div>
  );

  const FooterPagination = () => (
    <Pagination
      key='pagination'
      current={currentPage}
      onChange={setCurrentPage}
      total={currentMembers.length}
      pageSize={itemsPerPage}
      hideOnSinglePage
      simple
    />
  );

  const modalFooterContent = () => {
    if (isSaving) {
      return [<Spin key='footer-progress' />, <FooterPagination key='footer-pagination' />];
    } else if (deltaTargetKeys.length > 0) {
      return [<FooterButtons key='footer-buttons' />, <FooterPagination key='footer-pagination' />];
    } else {
      return [<FooterPagination key='footer-pagination' />];
    }
  };

  return (
    <Modal
      width={600}
      title={selectedCalendar && selectedCalendar.name}
      open={open}
      onCancel={handleModalClose}
      footer={modalFooterContent()}>
      {/* Autocomplete Search Bar */}
      <div className='flex mb-3 mt-3 w-[98%]'>
        <AutoComplete
          className='mr-auto'
          options={options}
          style={{ width: '75%' }}
          value={searchValue}
          onSelect={onSelect}
          onChange={(value, option) => onSearch(value)}
          placeholder='Search users'
          allowClear
        />
        <InviteByEmail
          selectedCalendar={selectedCalendar}
          setSelectedCalendar={setSelectedCalendar}
          isEmailModalOpen={isEmailModalOpen}
          setEmailModalOpen={setEmailModalOpen}
          createRequestMutation={createRequestMutation}
          refetchCalendars={refetchCalendars}
        />
      </div>

      <div className='member-row member-current' style={{ width: '100%', position: 'relative', minHeight: '370px' }}>
        <p className='member-row-title'>Subscribers</p>
        <CurrentMembersList
          members={paginatedMembers}
          hasPendingRequest={hasPendingRequest}
          selectedCalendar={selectedCalendar}
          setTargetKeys={setTargetKeys}
          deltaTargetKeys={deltaTargetKeys}
          setDeltaTargetKeys={setDeltaTargetKeys}
          handleRemovePendingUser={handleRemovePendingUser}
        />
        <div
          className='flex justify-end items-center'
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '2px'
          }}>
          {/* Creator's details at the bottom right */}
          <div
            className='flex justify-end items-center'
            style={{
              position: 'absolute',
              bottom: '10px',
              right: '2px'
            }}></div>
          <div className='text-blue-400 text-xs mr-1 italic'>
            {selectedCalendar?.creator.username}
            {/* <i style={{ fontSize: '11px', padding: 0, margin: 0 }}>{`(${creator && creator.email})`}</i> */}
          </div>
          <RiAdminFill className='text-blue-400 mr-2 text-sm' />
        </div>
      </div>
    </Modal>
  );
};

export default EditMemberList;
