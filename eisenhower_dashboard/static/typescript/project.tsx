import * as React from "react";
import * as ReactDOM from "react-dom";

import { EMatrix } from './components/EMatrix'; 


const user_data_element = document.querySelector("#user-data") as HTMLElement;
const user = {
    id: user_data_element.dataset.userId,
    username: user_data_element.dataset.userUsername
}

ReactDOM.render(
    <EMatrix user={user}/>,
    document.getElementById("root")
);