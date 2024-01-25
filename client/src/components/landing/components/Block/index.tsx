import { Container, TextWrapper, Content } from './styles';

const Block = ({ title, content }: { title: string; content: string }) => {
  return (
    <Container>
      <h1>{title}</h1>
      <TextWrapper>
        <Content>{content}</Content>
      </TextWrapper>
    </Container>
  );
};

export default Block;
