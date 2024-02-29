import { CSSProperties, FC, useContext, useEffect, useRef, VFC } from 'react';
import Box from '@mui/material/Box';
import styled from '@mui/material/styles/styled';
import LoginBoxInstance from './LoginBoxInstance';
import React from 'react';
import LoginBoxPreviewContext from './LoginBoxPreviewContext';

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  flex: 1,
  backgroundColor: theme.palette.grey[50],
}));

interface LoginBoxIframeProps {
  iframeStyle?: CSSProperties;
  withResolution?: boolean;
  ContainerComponent?: FC;
}

export const LoginBoxIframeRenderer: VFC<LoginBoxIframeProps> = (props) => {
  const { iframeStyle, ContainerComponent } = props;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const loginBoxContainerRef = useRef<HTMLElement>(null);
  const { setRenderer } = useContext(LoginBoxPreviewContext);

  const Wrapper = ContainerComponent ?? Container;

  useEffect(() => {
    let interval: any;
    const refElement = iframeRef.current;
    if (refElement?.contentDocument?.body) {
      const detector = document.createElement('div');
      detector.setAttribute('id', 'detector');
      refElement.contentDocument.body.appendChild(detector);
      let counter = 0;
      interval = setInterval(() => {
        if (refElement.contentDocument?.body) {
          if (refElement.contentDocument.body.querySelector('#detector')) {
            counter++;
          } else {
            const detector = document.createElement('div');
            detector.setAttribute('id', 'detector');
            refElement.contentDocument.body.appendChild(detector);
          }
          if (counter > 2) {
            LoginBoxInstance.render(refElement.contentDocument.body);
            setRenderer(LoginBoxInstance.renderer);
            LoginBoxInstance.setLoaded();
            clearInterval(interval);
          }
        }
      }, 50);
    } else {
      setRenderer(null);
    }
    return () => {
      interval && clearInterval(interval);
      LoginBoxInstance.renderer?.unmount();
      setRenderer(null);
    };
  }, [setRenderer]);

  return (
    <>
      <div>Render Login box in builder mode</div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <button
          style={{ height: '60px', width: '100px', fontSize: '14px' }}
          onClick={() => LoginBoxInstance.renderer.setRoute('/account/login')}
        >
          Login page
        </button>
        <button
          style={{ height: '60px', width: '100px', fontSize: '14px' }}
          onClick={() => LoginBoxInstance.renderer.setRoute('/account/sign-up')}
        >
          Sign up page
        </button>
        <button
          style={{ height: '60px', width: '100px', fontSize: '14px' }}
          onClick={() => LoginBoxInstance.renderer.setRoute('/account/activate')}
        >
          Activate account page
        </button>
        <button
          style={{ height: '60px', width: '100px', fontSize: '14px' }}
          onClick={() => LoginBoxInstance.renderer.setRoute('/account/forget-password')}
        >
          Forget password page
        </button>
        <button
          style={{ height: '60px', width: '100px', fontSize: '14px' }}
          onClick={() => LoginBoxInstance.renderer.setRoute('/account/reset-password')}
        >
          Reset password page
        </button>
      </div>
      <Wrapper ref={loginBoxContainerRef}>
        <iframe
          title='login-box-renderer'
          ref={iframeRef}
          style={{ border: 'unset', width: '100%', height: '1000px', ...iframeStyle }}
        />
      </Wrapper>
    </>
  );
};
