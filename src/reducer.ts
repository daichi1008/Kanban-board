import { Reducer } from "redux";
import produce  from "immer";

export type State={
    filterValue:string
}

const initialState: State={
    filterValue:'',
}

export type Action={
    type:'Filter.setFilter'
    payload:{
        value: string
    }
}

export const reducer :Reducer<
State,
Action
 > = produce((draft: State, action: Action) => {
     switch(action.type){
         case'Filter.setFilter':{
             const {value}=action.payload
draft.filterValue=value
return
         }
     }
 }, initialState)