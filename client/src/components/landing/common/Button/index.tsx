import { StyledButton } from './styles';

interface ButtonProps {
  color: string;
  children: any;
  onClick: (event?: any) => void;
  name?: string;
}

export const Button = ({ name, color, children, onClick }: ButtonProps) => (
  <StyledButton
    color={color}
    onClick={onClick}
    name={name}>
    {children}
  </StyledButton>
);
