import { createContext, useState, useContext, useEffect } from 'react';
import { Task } from '@/types'; // Ensure these types are correctly imported

interface ScheduleContextType {
  currentTask: Task | null;
  setCurrentTask: (task: Task | null) => void;
  isScheduleModalOpen: boolean;
  setScheduleModalOpen: (isOpen: boolean) => void;
  isTaskModalOpen: boolean;
  setTaskModalOpen: (isOpen: boolean) => void;
}

const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

export const ScheduleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [isScheduleModalOpen, setScheduleModalOpen] = useState<boolean>(false);
  const [isTaskModalOpen, setTaskModalOpen] = useState<boolean>(false);

  // triggers CmdKInput component for AI scheduler
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setTaskModalOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <ScheduleContext.Provider
      value={{
        currentTask,
        setCurrentTask,
        isScheduleModalOpen,
        setScheduleModalOpen,
        isTaskModalOpen,
        setTaskModalOpen
      }}>
      {children}
    </ScheduleContext.Provider>
  );
};

export const useSchedule = () => {
  const context = useContext(ScheduleContext);
  if (!context) {
    throw new Error('useSchedule must be used within a ScheduleProvider');
  }
  return context;
};
