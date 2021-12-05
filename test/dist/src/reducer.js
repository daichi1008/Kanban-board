"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducer = void 0;
const immer_1 = __importDefault(require("immer"));
const util_1 = require("./util");
const initialState = {
    filterValue: '',
    cardsOrder: {}
};
exports.reducer = (0, immer_1.default)((draft, action) => {
    var _a;
    switch (action.type) {
        case 'Filter.setFilter': {
            const { value } = action.payload;
            draft.filterValue = value;
            return;
        }
        case 'App.SetColumns': {
            const { columns } = action.payload;
            draft.columns = columns;
            return;
        }
        case 'App.SetCards': {
            const { cards: unorderedCards, cardsOrder } = action.payload;
            draft.cardsOrder = cardsOrder;
            (_a = draft.columns) === null || _a === void 0 ? void 0 : _a.forEach(column => {
                column.cards = (0, util_1.sortBy)(unorderedCards, cardsOrder, column.id);
            });
            return;
        }
        default: {
            const _ = action;
        }
    }
}, initialState);
