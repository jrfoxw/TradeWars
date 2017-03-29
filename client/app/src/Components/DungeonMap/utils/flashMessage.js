/**
 * Created by PY-DEV on 2/24/2017.
 */
import React, { Component } from 'react';


function flash(props){



        let color = props.color;

        return (

            <div style={{ color:{color} }}>{props.message}</div>
        )

     }

export default flash;




