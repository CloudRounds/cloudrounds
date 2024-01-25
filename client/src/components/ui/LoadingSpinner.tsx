interface LoadingSpinnerProps {
  asOverlay?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const LoadingSpinner = (props: LoadingSpinnerProps) => {
  return (
    <div className={`${props.asOverlay && 'loadingSpinnerOverlay'} `}>
      <div className='ldsDualRing'></div>
    </div>
  );
};

export default LoadingSpinner;
