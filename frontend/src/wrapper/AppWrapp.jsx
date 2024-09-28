import { NavigationDots, SocialMedia } from '../components';

const AppWrap = (Component, idName, classNames) => {
  const WrappedComponent = () => (
    <div id={idName} className={`app__container ${classNames}`}>
      <SocialMedia />
      <div className="app__wrapper app__flex">
        <Component />

        <div className="copyright">
          <p className="p-text">@2024 Francesca Fargion</p>
          <p className="p-text">All rights reserved</p>
          <p className="p-text">Website created by Giacomo Fargion</p>
        </div>
      </div>
      <NavigationDots active={idName} />
    </div>
  );

  // Give a name to the wrapped component
  WrappedComponent.displayName = `AppWrap(${Component.displayName || Component.name || 'Component'})`;

  return WrappedComponent;
};

export default AppWrap;
