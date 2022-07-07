import React from 'react'
import { inject, observer } from 'mobx-react';

const Index = (props) => {

  props.AuthStore.getToken();
console.log(props.AuthStore.appState);

  return <div>hhhindex</div>

};

export default inject("AuthStore")(observer(Index));