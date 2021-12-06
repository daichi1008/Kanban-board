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
    var _a, _b;
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
        case 'Card.SetDeletingCard': {
            const { cardID } = action.payload;
            draft.deletingCardID = cardID;
            return;
        }
        case 'Dialog.ConfirmDelete': {
            const cardID = draft.deletingCardID;
            if (!cardID)
                return;
            draft.deletingCardID = undefined;
            const column = (_b = draft.columns) === null || _b === void 0 ? void 0 : _b.find(col => { var _a; return (_a = col.cards) === null || _a === void 0 ? void 0 : _a.some(c => c.id === cardID); });
            if (!(column === null || column === void 0 ? void 0 : column.cards))
                return;
            column.cards = column.cards.filter(c => c.id !== cardID);
            const patch = (0, util_1.reorderPatch)(draft.cardsOrder, cardID);
            draft.cardsOrder = {
                ...draft.cardsOrder,
                ...patch,
            };
            return;
        }
        case 'Dialog.CancelDelete': {
            draft.deletingCardID = undefined;
            return;
        }
        default: {
            const _ = action;
        }
    }
}, initialState);
