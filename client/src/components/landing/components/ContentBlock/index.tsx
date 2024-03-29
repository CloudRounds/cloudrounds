import { Row, Col } from 'antd';
import { Fade, FadeProps } from 'react-awesome-reveal';
import { Button } from '../../common/Button';
import { SvgIcon } from '../../common/SvgIcon';
import {
  ContentSection,
  Content,
  ContentWrapper,
  ServiceWrapper,
  MinTitle,
  MinPara,
  StyledRow,
  ButtonWrapper
} from './styles';

interface SectionItem {
  title: string;
  content: string;
  icon: string;
}

interface ContentBlockProps {
  icon: string;
  title: string;
  content: string;
  section?: Array<SectionItem>;
  button?: any;
  id: string;
  direction: FadeProps['direction'];
}

const ContentBlock = ({ icon, title, content, section, button, id, direction }: ContentBlockProps) => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <ContentSection>
      <Fade direction={direction} triggerOnce>
        <StyledRow justify='space-between' align='middle' id={id} direction={direction}>
          <Col lg={11} md={11} sm={12} xs={24}>
            <SvgIcon src={icon} width='100%' height='100%' />
          </Col>
          <Col lg={11} md={11} sm={11} xs={24}>
            <ContentWrapper>
              <h1>{title}</h1>
              <Content>{content}</Content>
              {direction === 'right' ? (
                <ButtonWrapper>
                  {typeof button === 'object' &&
                    button.map((item: any, id: string) => {
                      return (
                        <Button key={id} color={item.color} onClick={() => scrollTo('about')}>
                          {item.title}
                        </Button>
                      );
                    })}
                </ButtonWrapper>
              ) : (
                <ServiceWrapper>
                  <Row justify='space-between'>
                    {Array.isArray(section) &&
                      section.map((item: any, id: number | string) => {
                        return (
                          <Col key={id} span={11}>
                            <SvgIcon src={item.icon} width='60px' height='60px' />
                            <MinTitle>{item.title}</MinTitle>
                            <MinPara>{item.content}</MinPara>
                          </Col>
                        );
                      })}
                  </Row>
                </ServiceWrapper>
              )}
            </ContentWrapper>
          </Col>
        </StyledRow>
      </Fade>
    </ContentSection>
  );
};

export default ContentBlock;
