import './Preloader.css';

export default function Preloader() {
  return (
    <div className="preloader">
      <div className="preloader__container">
        <div className="preloader__element">
          <div className="preloader__element-child" />
          <div className="preloader__element-child" />
          <div className="preloader__element-child" />
        </div>
      </div>
    </div>
  );
}
