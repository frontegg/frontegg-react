import React from 'react';

export interface IframeProps {
  title: string;
  html: string;
  onContentChange?: { selector: string; onChange: (value: string) => void };
  fixedHeight?: string
}

export class Iframe extends React.Component<IframeProps> {
  iframeRef = React.createRef<HTMLIFrameElement>();

  componentDidMount(): void {
    this.loadHtml();
  }

  componentDidUpdate(prevProps: Readonly<{ html: string }>, prevState: Readonly<{}>, snapshot?: any): void {
    if (prevProps.html !== this.props.html) {
      this.loadHtml();
    }
  }

  loadHtml = () => {
    const iframeElement = this.iframeRef.current;
    if (iframeElement) {
      iframeElement.src = 'about:blank';
      iframeElement.contentWindow?.document.open();
      iframeElement.contentWindow?.document.write(this.props.html);
      iframeElement.contentWindow?.document.close();
      setTimeout(() => this.setIframeHeight(iframeElement), 100);
    }
  };

  static removeUnits(input: string): number {
    if (input == null || input === 'auto') {
      return 0;
    }
    const regex = /[+-]?\d+(?:\.\d+)?/g;
    try {
      return Number(regex.exec(`${input}`)?.[0] ?? 0);
    } catch (e) {
      console.log('pixelWithoutUnit()', input, e.message);
      return 0;
    }
  }

  setIframeHeight = (iframe: HTMLIFrameElement) => {
    const { onContentChange, fixedHeight } = this.props;
    if (iframe) {
      var iframeWin = iframe.contentWindow;
      if (iframeWin?.document.body && !fixedHeight) {
        iframe.style.minHeight =
          Iframe.removeUnits(`${(iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight) + 50}`) + 'px';
      }
      if (fixedHeight) {
        iframe.style.height = fixedHeight;
      }
      if (onContentChange) {
        iframe.contentWindow?.document.querySelector(onContentChange.selector)?.addEventListener('input', (e: any) => {
          onContentChange.onChange((e?.target?.innerText || '').trim());
        });
      }
    }
  };

  render() {
    return (
      <iframe
        title={this.props.title}
        ref={this.iframeRef}
        style={{ width: '100%', border: '0px solid black' }}
      />
    );
  }
}
