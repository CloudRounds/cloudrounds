import { Calendar } from '@/types';
import { useState } from 'react';

interface ArticleFiltersProps {
  canReadCalendars: Calendar[];
  selectedCalendars: string[];
  setSelectedCalendars: (calendars: string[]) => void;
}

export const ArticleFilters = ({ canReadCalendars, selectedCalendars, setSelectedCalendars }: ArticleFiltersProps) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const allowedCalendars = canReadCalendars.map(calendar => calendar.name);
  const filteredCalendars = allowedCalendars.filter(name => name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleToggle = (calendar: string) => {
    let newCalendars = [...selectedCalendars];
    if (newCalendars.includes(calendar)) {
      newCalendars = newCalendars.filter(p => p !== calendar);
    } else {
      newCalendars.push(calendar);
    }
    setSelectedCalendars(newCalendars);
  };

  const toggleAll = () => {
    if (selectedCalendars.length === allowedCalendars.length) {
      setSelectedCalendars([]);
    } else {
      setSelectedCalendars(allowedCalendars);
    }
  };

  return (
    <div className='flex'>
      {open && (
        <div className='w-64 h-screen bg-gray-200 fixed top-0 right-0 overflow-y-auto'>
          <div className='p-4'>
            <input
              type='text'
              placeholder='Search...'
              className='w-full p-2 mb-4 border rounded'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <button onClick={toggleAll} className='w-full p-2 mb-4 bg-blue-500 text-white rounded'>
              {selectedCalendars.length === allowedCalendars.length ? 'Deselect All' : 'Select All'}
            </button>
            {filteredCalendars.map(calendar => (
              <div key={calendar} className='flex items-center p-2 hover:bg-gray-300'>
                <input
                  type='checkbox'
                  checked={selectedCalendars.includes(calendar)}
                  onChange={() => handleToggle(calendar)}
                  className='mr-2'
                />
                <span>{calendar}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
