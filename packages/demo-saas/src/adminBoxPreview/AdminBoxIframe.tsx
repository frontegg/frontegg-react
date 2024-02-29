import { CSSProperties, FC, useContext, useEffect, useRef, VFC } from 'react';
import Box from '@mui/material/Box';
import styled from '@mui/material/styles/styled';
import AdminBoxInstance from './AdminBoxInstance';
import React from 'react';
import AdminBoxPreviewContext from './AdminBoxPreviewContext';

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  flex: 1,
  backgroundColor: theme.palette.grey[50],
}));

interface AdminBoxIframeProps {
  iframeStyle?: CSSProperties;
  withResolution?: boolean;
  ContainerComponent?: FC;
}

export const AdminBoxIframeRenderer: VFC<AdminBoxIframeProps> = (props) => {
  const { iframeStyle, ContainerComponent } = props;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const adminBoxContainerRef = useRef<HTMLElement>(null);
  const { setRenderer } = useContext(AdminBoxPreviewContext);

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
            AdminBoxInstance.render(refElement.contentDocument.body);
            setRenderer(AdminBoxInstance.renderer);
            AdminBoxInstance.setLoaded();
            clearInterval(interval);
          }
        }
      }, 50);
    } else {
      setRenderer(null);
    }
    return () => {
      interval && clearInterval(interval);
      AdminBoxInstance.renderer?.unmount();
      setRenderer(null);
    };
  }, [setRenderer]);

  //Use this to update the navigation metadata
  // useEffect(() => {
  //   renderer?.app?.updateMetadata({
  //     navigation: {
  //     },
  //   });
  // }, [renderer]);

  return (
    <Wrapper ref={adminBoxContainerRef}>
      <iframe
        title='login-box-renderer'
        ref={iframeRef}
        style={{ border: 'unset', width: '100%', minHeight: '400px', ...iframeStyle }}
      />
    </Wrapper>
  );
};
