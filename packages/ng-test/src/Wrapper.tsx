import React, { ReactElement } from 'react';
import { Provider } from './context';
import { Router, Route, Switch } from 'react-router-dom';
// import { createMemoryHistory } from 'history';
import { LoginComponent } from './LoginComponent';
import { TeamTestComponent } from './TeamTestComponent';

// const history = createMemoryHistory();
// @ts-ignore
// window.rcHistory = history;

export class Wrapper extends React.Component<{ ngComponents: any; rcPortals: any; _history: any }> {
  state = {
    counter: 10,
    rcPortals: [],
  };

  focus() {
    console.warn('Wrapper.focus');
  }

  mountChild(child: ReactElement) {
    console.warn('Wrapper.mountChild');
    this.setState({ rcPortals: [...this.state.rcPortals, child] });
  }

  unmountChild(child: ReactElement) {
    console.warn('Wrapper.unmountChild');
    this.setState({ rcPortals: this.state.rcPortals.filter((r) => r !== child) });
  }

  componentDidMount() {
    console.warn('Wrapper.componentDidMount');
    setInterval(() => {
      this.setState({ counter: this.state.counter + 1 });
    }, 1000);
  }

  componentWillUnmount() {
    console.warn('Wrapper.componentWillUnmount');
  }

  render() {
    const { children, ngComponents, _history: history } = this.props;
    const { rcPortals, counter } = this.state;
    // debugger;
    return (
      <Router history={history}>
        <Provider value={{ counter }}>
          <div className={'WrapperDiv'}>
            {children}
            {ngComponents}

            <Switch>
              <Route path='/login' component={LoginComponent} />
              <Route path='/team/test' component={TeamTestComponent} />
            </Switch>
          </div>
          {rcPortals}
        </Provider>
      </Router>
    );
  }
}
