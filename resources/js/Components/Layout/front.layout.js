import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { inject, observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';

const Layout = (props) => {

    props.AuthStore.getToken();
    

    useEffect(() => {
        const token = (props.AuthStore.appState != null) ? props.AuthStore.appState.user.access_token : null;
        axios.post(`/api/authenticate`, {}, {
            headers: {
                Authorization: 'Bearer' + token
            }
        }).then((res) => {
            console.log(res)
        })
        .catch(e => {
                console.log(e);
            });
    }, [])



    return (
        <>
           
            <div> {props.children}</div>

        </>
    )
}

export default inject("AuthStore")(observer(Layout));