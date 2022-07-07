import React from 'react'
import { inject, observer } from 'mobx-react';
import Layout from '../../Components/Layout/front.layout';



const Index = (props) => {

  props.AuthStore.getToken();
const logout = () => {
  props.AuthStore.removeToken();
  props.history.push("/login");
}

return (
    <Layout>
      <div>
        index
        <div>   <button onClick={logout}>Çıkış</button>  </div>
      </div>
    </Layout>
  )
};

export default inject("AuthStore")(observer(Index));