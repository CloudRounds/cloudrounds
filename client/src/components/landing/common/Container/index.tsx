import { StyledContainer } from './styles';

interface ContainerProps {
  border?: boolean;
  children: any;
}
const Container = ({ border, children }: ContainerProps) => (
  <StyledContainer shouldHaveBorder={border}>{children}</StyledContainer>
);

export default Container;
