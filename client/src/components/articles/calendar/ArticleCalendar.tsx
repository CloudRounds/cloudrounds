import { useState } from 'react';
import { Button, Table } from 'antd';
import CalendarCell from './CalendarCell';
import { monthNames } from '@/utils/constants';
import { CalendarOutlined, RightCircleOutlined, LeftCircleOutlined } from '@ant-design/icons';
import { Article } from '@/types';

type Week = {
  [key: number]: React.ReactNode | null;
  key?: number;
};

const ArticleCalendar = ({ articles }: { articles: Article[] }) => {
  const [date, setDate] = useState<Date>(new Date());
  const [selected, setSelected] = useState<number | null>(null);
  const [scrolling, setScrolling] = useState<boolean>(false);

  const changeMonth = (offset: number) => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    newDate.setDate(1);
    newDate.setMonth(newDate.getMonth() + offset);
    setDate(newDate);
  };

  const goToToday = () => {
    const newDate = new Date();
    newDate.setHours(0, 0, 0, 0);
    setDate(newDate);
    setSelected(null);
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (scrolling) {
      return; // do nothing if already scrolling
    }

    // Add a delay of 500 milliseconds (0.5 second) after changing the month
    const offset = event.deltaY > 0 ? 1 : -1;
    setScrolling(true); // Set scrolling to true

    // Change the month with delay
    changeMonthWithDelay(offset);
  };

  const changeMonthWithDelay = (offset: number) => {
    // Change the month
    changeMonth(offset);

    // Set a timeout for 0.5 seconds
    setTimeout(() => {
      // Update the selected state after the delay
      setSelected(null);
      setScrolling(false); // Set scrolling back to false after the delay
    }, 1500);
  };

  const month = date.getMonth();
  const year = date.getFullYear();
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const filteredArticles = articles.filter(article => {
    const articleDate = new Date(article.date);
    return articleDate.getMonth() === month && articleDate.getFullYear() === year;
  });

  const generateCalendarCells = () => {
    let rows = [];
    let day = 1;

    for (let i = 0; i < 6; i++) {
      let week: Week = {};

      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          week[j] = null;
        } else if (day > lastDate) {
          week[j] = null;
        } else {
          const cellDate = new Date(year, month, day);
          const eventsOnThisDay = filteredArticles.filter(article => {
            const articleDate = new Date(article.date);
            return articleDate.toDateString() === cellDate.toDateString();
          });

          week[j] = (
            <CalendarCell
              key={`cell-${i}-${j}-${day}`}
              day={day}
              month={month}
              year={year}
              events={eventsOnThisDay}
              setSelected={setSelected}
            />
          );
          day++;
        }
      }

      // Check if all days in the week are null
      if (!Object.values(week).every(day => day === null)) {
        week['key'] = i;

        rows.push(week);
      }
    }

    return rows;
  };

  const calendarData = generateCalendarCells();

  return (
    <div
      id='calendar-container'
      className='flex flex-col'
      onWheel={handleWheel} // Make sure to use the correct event handler here
    >
      <div id='calendar-head' className='flex items-center justify-between bg-[#5161ce]  text-white rounded-t-xl p-2'>
        <Button
          id='prev-month'
          ghost
          className='calendar-chevron'
          onClick={() => changeMonth(-1)}
          icon={<LeftCircleOutlined />}
        />

        <Button onClick={goToToday} className='today-button'>
          <CalendarOutlined className='absolute hidden bg-white p-[6px] rounded-md today-icon' />
          <span className='today-text'>TODAY</span>
        </Button>

        <span id='current-month-year'>{`${monthNames[month]} ${year}`}</span>

        <Button
          id='next-month'
          ghost
          className='calendar-chevron'
          onClick={() => changeMonth(1)}
          icon={<RightCircleOutlined />}
        />
      </div>
      <Table id='calendar-body' dataSource={calendarData} pagination={false}>
        <Table.Column title='Sun' dataIndex='0' key='0' />
        <Table.Column title='Mon' dataIndex='1' key='1' />
        <Table.Column title='Tue' dataIndex='2' key='2' />
        <Table.Column title='Wed' dataIndex='3' key='3' />
        <Table.Column title='Thu' dataIndex='4' key='4' />
        <Table.Column title='Fri' dataIndex='5' key='5' />
        <Table.Column title='Sat' dataIndex='6' key='6' />
      </Table>
    </div>
  );
};

export default ArticleCalendar;
