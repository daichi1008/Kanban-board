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
// setImmediate(() => test.run())
const initialState = {
    filterValue: '',
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
