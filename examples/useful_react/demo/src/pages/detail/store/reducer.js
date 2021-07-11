import {fromJS} from "immutable"
import {
    change_home_data,
    change_to_top,
    get_list_more,
    getdetailcontent
} from "./actionTypes";

const defaultState = fromJS({
    title:'',
    content:''
    })
;


export default (state = defaultState, action) => {


    switch (action.type) {
        case getdetailcontent:
            return state.merge({
                title:action.title,
                content:action.content,
            });

        default:
            return state
    }

}



