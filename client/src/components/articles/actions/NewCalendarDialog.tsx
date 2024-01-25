export interface NewCalendar {
  name: string;
  description?: string;
}

interface NewCalendarDialogProps {
  showAddCalendarModal: boolean;
  setShowAddCalendarModal: (showAddCalendarModal: boolean) => void;
  setNewCalendar: (newCalendar: NewCalendar) => void;
  newCalendar: NewCalendar;
  handleAddCalendar: () => void;
}

const NewCalendarDialog = ({
  showAddCalendarModal,
  setShowAddCalendarModal,
  setNewCalendar,
  newCalendar,
  handleAddCalendar
}: NewCalendarDialogProps) => {
  return (
    <div className={showAddCalendarModal ? 'fixed inset-0 flex items-center justify-center z-50' : 'hidden'}>
      <div className='bg-white p-4 rounded'>
        <h3 className='text-lg font-semibold'>Add New Calendar</h3>
        <div className='mt-4'>
          <input
            type='text'
            placeholder='Calendar Name'
            className='w-full p-2 border rounded'
            value={newCalendar.name}
            onChange={e => setNewCalendar({ ...newCalendar, name: e.target.value })}
          />
        </div>
        <div className='mt-4'>
          <input
            type='text'
            placeholder='Description'
            className='w-full p-2 border rounded'
            value={newCalendar.description}
            onChange={e => setNewCalendar({ ...newCalendar, description: e.target.value })}
          />
        </div>
        <div className='flex justify-end mt-4'>
          <button
            className='bg-red-500 text-white px-4 py-2 rounded mr-2'
            onClick={() => setShowAddCalendarModal(false)}>
            Cancel
          </button>
          <button
            className='bg-blue-500 text-white px-4 py-2 rounded'
            onClick={handleAddCalendar}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
export default NewCalendarDialog;
