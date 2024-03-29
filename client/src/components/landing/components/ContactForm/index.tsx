import { Row, Col } from 'antd';
import { Slide, Zoom } from 'react-awesome-reveal';
import { useForm } from '../../common/utils/useForm';
import validate from '../../common/utils/validationRules';
import { Button } from '../../common/Button';
import Block from '../Block';
import Input from '../../common/Input';
import TextArea from '../../common/TextArea';
import { ContactContainer, FormGroup, Span, ButtonContainer } from './styles';

interface FormErrors {
  [key: string]: string | undefined;
}

interface ValidationTypeProps {
  type: string;
  errors: FormErrors;
}

const Contact = ({ title, content, id }: { title: string; content: string; id: string }) => {
  const { values, errors, handleChange, handleSubmit } = useForm(validate);

  const ValidationType: React.FC<ValidationTypeProps> = ({ type }) => {
    const ErrorMessage = errors[type];
    return (
      <Zoom direction='left'>
        <Span>{ErrorMessage}</Span>
      </Zoom>
    );
  };

  return (
    <ContactContainer id={id}>
      <Row
        justify='space-between'
        align='middle'>
        <Col
          lg={12}
          md={11}
          sm={24}
          xs={24}>
          <Slide
            direction='left'
            triggerOnce>
            <Block
              title={title}
              content={content}
            />
          </Slide>
        </Col>
        <Col
          lg={12}
          md={12}
          sm={24}
          xs={24}>
          <Slide
            direction='right'
            triggerOnce>
            <FormGroup
              autoComplete='off'
              onSubmit={handleSubmit}>
              <Col span={24}>
                <Input
                  type='text'
                  name='name'
                  placeholder='Your Name'
                  value={values.name || ''}
                  onChange={handleChange}
                />
                <ValidationType
                  type='name'
                  errors={errors}
                />
              </Col>
              <Col span={24}>
                <Input
                  type='text'
                  name='email'
                  placeholder='Your Email'
                  value={values.email || ''}
                  onChange={handleChange}
                />
                <ValidationType
                  type='email'
                  errors={errors}
                />
              </Col>
              <Col span={24}>
                <TextArea
                  placeholder='Your Message'
                  value={values.message || ''}
                  name='message'
                  onChange={handleChange}
                />
                <ValidationType
                  type='message'
                  errors={errors}
                />
              </Col>
              <ButtonContainer>
                <Button
                  name='submit'
                  color='primary'
                  onClick={handleSubmit}>
                  Submit
                </Button>
              </ButtonContainer>
            </FormGroup>
          </Slide>
        </Col>
      </Row>
    </ContactContainer>
  );
};

export default Contact;
