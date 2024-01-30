import { Article } from '@/types';
import { extractTimesFromDuration } from '@/utils/dates';
import { AppleOutlined, CalendarOutlined, GoogleOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import dayjs from 'dayjs';
import { EventAttributes, createEvent } from 'ics';
import { useState } from 'react';

interface ExportButtonProps {
  article: any;
  text?: string;
  fontSize?: string;
}

const ExportButton = ({ article, text, fontSize }: ExportButtonProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleMenuClick = (key: string) => {
    if (key === 'ical') {
      createIcsFile(article);
    } else if (key === 'gmail') {
      openGmailLink(article);
    }
    setVisible(false);
  };

  const menuItems = [
    {
      key: 'ical',
      label: 'iCal',
      onClick: () => handleMenuClick('ical')
    },
    {
      key: 'gmail',
      label: 'GCal',
      onClick: () => handleMenuClick('gmail')
    }
  ];

  const fillDescription = (event: Article) => {
    const { additionalDetails, speaker, organizer, meetingId, passcode, eventLink } = event;

    let description = '';

    if (eventLink) {
      description += `${eventLink}\n`;
    }

    if (additionalDetails) {
      description += `Details: ${additionalDetails}\n`;
    }

    if (speaker) {
      description += `Speaker: ${speaker}\n`;
    }

    if (organizer) {
      description += `Organized by: ${organizer.firstName} ${organizer.lastName}\n`;
    }

    if (meetingId) {
      description += `Meeting ID: ${meetingId}\n`;
    }

    if (passcode) {
      description += `Passcode: ${passcode}\n`;
    }

    return description;
  };

  const createIcsFile = (event: Article) => {
    const { title, date, duration, location, eventLink } = event;
    const [startTime, endTime] = extractTimesFromDuration(duration);
    const startDate = dayjs(date).hour(startTime.hour()).minute(startTime.minute());
    const endDate = dayjs(date).hour(endTime.hour()).minute(endTime.minute());
    const description = fillDescription(event);

    const eventObject: EventAttributes = {
      title: title || 'Untitled Event',
      description: description,
      start: [startDate.year(), startDate.month() + 1, startDate.date(), startDate.hour(), startDate.minute()],
      end: [endDate.year(), endDate.month() + 1, endDate.date(), endDate.hour(), endDate.minute()],
      location: location || '',
      url: isValidUrl(eventLink) ? eventLink : ''
    };

    if (description) {
      eventObject.description = description;
    }

    createEvent(eventObject, (error, value) => {
      if (error) {
        console.error('Error creating ICS file:', error);
        return;
      } else {
        const blob = new Blob([value], { type: 'text/calendar;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${title.replace(/[^a-zA-Z ]/g, '') || 'untitled'}.ics`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    });
  };

  // URL validation function
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  const createGmailLink = (event: Article) => {
    const { title, date, duration, location, eventLink } = event;
    const [startTime, endTime] = extractTimesFromDuration(duration);

    const startDate = dayjs(date).hour(startTime.hour()).minute(startTime.minute());
    const endDate = dayjs(date).hour(endTime.hour()).minute(endTime.minute());

    const description = fillDescription(event);

    let gmailLink = `https://mail.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title || 'Untitled Event'
    )}&dates=${startDate.format('YYYYMMDDTHHmmss')}%2F${endDate.format('YYYYMMDDTHHmmss')}&details=${encodeURIComponent(
      description
    )}&location=${encodeURIComponent(location || '')}`;

    // Include url property only if event_link is not empty and is a valid URL
    if (eventLink && isValidUrl(eventLink)) {
      gmailLink += `&url=${encodeURIComponent(eventLink)}`;
    }

    return gmailLink;
  };

  const openGmailLink = (event: Article) => {
    const gmailLink = createGmailLink(event);
    window.open(gmailLink, '_blank');
  };

  return (
    <Dropdown
      menu={{
        items: menuItems,
        triggerSubMenuAction: 'click'
      }}
      placement='bottomRight'
      arrow>
      <div className='flex items-center basic-btn red-full px-2 py-[3px] hover:bg-purple-100 rounded-md'>
        <CalendarOutlined className='text-md text-[#f47d7f]' />
        <p className='ml-1 text-[#f47d7f]' style={{ fontWeight: 700, fontFamily: 'sans-serif', fontSize: '12px' }}>
          {text ? text : 'Export'}
        </p>
      </div>
    </Dropdown>
  );
};

export default ExportButton;
