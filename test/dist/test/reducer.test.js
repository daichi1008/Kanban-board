"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baretest_1 = __importDefault(require("baretest"));
const assert_1 = __importDefault(require("assert"));
const immer_1 = __importDefault(require("immer"));
const reducer_1 = require("../src/reducer");
const test = (0, baretest_1.default)('reducer');
const initialState = {
    filterValue: '',
    cardsOrder: {}
};
test('Filter.SetFilter', async () => {
    const prev = (0, immer_1.default)(initialState, draft => {
        draft.filterValue = 'hello';
    });
    const next = (0, reducer_1.reducer)(prev, {
        type: 'Filter.setFilter',
        payload: {
            value: 'welcome',
        },
    });
    const expected = (0, immer_1.default)(prev, draft => {
        draft.filterValue = 'welcome';
    });
    assert_1.default.deepStrictEqual(next, expected);
});
test('App.SetCards', async () => {
    const prev = (0, immer_1.default)(initialState, draft => {
        draft.columns = [
            {
                id: 'A',
            },
            {
                id: 'B',
            },
        ];
    });
    const next = (0, reducer_1.reducer)(prev, {
        type: 'App.SetCards',
        payload: {
            cards: [
                {
                    id: '3',
                },
                {
                    id: '2',
                },
                {
                    id: '1',
                },
            ],
            cardsOrder: {
                A: '1',
                '1': '2',
                '2': 'A',
                B: '3',
                '3': 'B',
            },
        },
    });
    const expected = (0, immer_1.default)(prev, draft => {
        draft.cardsOrder = {
            A: '1',
            '1': '2',
            '2': 'A',
            B: '3',
            '3': 'B',
        };
        draft.columns = [
            {
                id: 'A',
                cards: [
                    {
                        id: '1',
                    },
                    {
                        id: '2',
                    },
                ],
            },
            {
                id: 'B',
                cards: [
                    {
                        id: '3',
                    },
                ],
            },
        ];
    });
    assert_1.default.deepStrictEqual(next, expected);
});
test('Dialog.ConfirmDelete', async () => {
    const prev = (0, immer_1.default)(initialState, draft => {
        draft.deletingCardID = '3';
        draft.cardsOrder = {
            A: '1',
            '1': '2',
            '2': 'A',
            B: '3',
            '3': 'B',
        };
        draft.columns = [
            {
                id: 'A',
                cards: [
                    {
                        id: '1',
                    },
                    {
                        id: '2',
                    },
                ],
            },
            {
                id: 'B',
                cards: [
                    {
                        id: '3',
                    },
                ],
            },
        ];
    });
    const next = (0, reducer_1.reducer)(prev, {
        type: 'Dialog.ConfirmDelete',
    });
    const expected = (0, immer_1.default)(prev, draft => {
        draft.deletingCardID = undefined;
        draft.cardsOrder = {
            ...draft.cardsOrder,
            B: 'B',
            '3': null,
        };
        const column = draft.columns[1];
        column.cards = [];
    });
    assert_1.default.deepStrictEqual(next, expected);
});
test.run();
