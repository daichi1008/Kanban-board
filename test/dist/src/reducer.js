"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducer = void 0;
const immer_1 = __importDefault(require("immer"));
const initialState = {
    filterValue: '',
};
exports.reducer = (0, immer_1.default)((draft, action) => {
    switch (action.type) {
        case 'Filter.setFilter': {
            const { value } = action.payload;
            draft.filterValue = value;
            return;
        }
    }
}, initialState);
