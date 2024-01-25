import { useState, useEffect } from 'react';
import { notification } from 'antd';
import axios from 'axios';

interface FormErrors {
  [key: string]: string | undefined;
}

export const useForm = (validate: any) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [shouldSubmit, setShouldSubmit] = useState(false);

  const openNotificationWithIcon = () => {
    notification['success']({
      message: 'Success',
      description: 'Your message has been sent!'
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setErrors(validate(values));
    // Your url for API
    const url = '';
    if (Object.values(values).every(x => x !== '')) {
      axios
        .post(url, {
          ...values
        })
        .then(() => {
          setShouldSubmit(true);
        });
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && shouldSubmit) {
      setValues(values => (values = { name: '', email: '', message: '' }));
      openNotificationWithIcon();
    }
  }, [errors, shouldSubmit]);

  const handleChange = (event: any) => {
    event.persist();
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value
    }));
    setErrors(errors => ({ ...errors, [event.target.name]: '' }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors
  };
};
