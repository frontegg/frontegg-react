import React from 'react';


class Field extends React.Component {

  render() {
    return (
      <div>

      </div>
    );
  }
}

export class Button extends React.Component {
  static asField = Field;

  render() {
    return <div>
      Button
    </div>;
  }
}
