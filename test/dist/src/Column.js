"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Column = void 0;
const react_1 = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const color = __importStar(require("./color"));
const Card_1 = require("./Card");
const icon_1 = require("./icon");
const InputForm_1 = require("./InputForm");
function Column({ title, filterValue: rawFilterValue, cards: rawCards, onCardDragStart, onCardDrop, onCardDeleteClick, text, onTextChange, onTextConfirm, onTextCancel, }) {
    var _a, _b, _c;
    const filterValue = rawFilterValue === null || rawFilterValue === void 0 ? void 0 : rawFilterValue.trim();
    const keywords = (_a = filterValue === null || filterValue === void 0 ? void 0 : filterValue.toLowerCase().split(/\s+/g)) !== null && _a !== void 0 ? _a : [];
    const cards = rawCards === null || rawCards === void 0 ? void 0 : rawCards.filter(({ text }) => keywords === null || keywords === void 0 ? void 0 : keywords.every(w => text === null || text === void 0 ? void 0 : text.toLowerCase().includes(w)));
    const totalCount = (_b = rawCards === null || rawCards === void 0 ? void 0 : rawCards.length) !== null && _b !== void 0 ? _b : -1;
    const [inputMode, setInputMode] = (0, react_1.useState)(false);
    const toggleInput = () => setInputMode(v => !v);
    const confirmInput = () => {
        onTextConfirm === null || onTextConfirm === void 0 ? void 0 : onTextConfirm();
    };
    const cancelInput = () => {
        setInputMode(false);
        onTextCancel === null || onTextCancel === void 0 ? void 0 : onTextCancel();
    };
    const [draggingCardID, setDraggingCardID] = (0, react_1.useState)(undefined);
    const handleCardDragStart = (id) => {
        setDraggingCardID(id);
        onCardDragStart === null || onCardDragStart === void 0 ? void 0 : onCardDragStart(id);
    };
    return (react_1.default.createElement(Container, null,
        react_1.default.createElement(Header, null,
            totalCount >= 0 && react_1.default.createElement(CountBadge, null, totalCount),
            react_1.default.createElement(ColumnName, null, title),
            react_1.default.createElement(AddButton, { onClick: toggleInput })),
        inputMode && (react_1.default.createElement(InputForm, { value: text, onChange: onTextChange, onConfirm: confirmInput, onCancel: cancelInput })),
        !cards ? (react_1.default.createElement(Loading, null)) : (react_1.default.createElement(react_1.default.Fragment, null,
            filterValue && react_1.default.createElement(ResultCount, null,
                cards.length,
                "results"),
            react_1.default.createElement(VerticalScroll, null,
                cards.map(({ id, text }, i) => {
                    var _a;
                    return (react_1.default.createElement(Card_1.Card.DropArea, { key: id, disabled: draggingCardID !== undefined &&
                            (id === draggingCardID || ((_a = cards[i - 1]) === null || _a === void 0 ? void 0 : _a.id) === draggingCardID), onDrop: () => onCardDrop === null || onCardDrop === void 0 ? void 0 : onCardDrop(id) },
                        react_1.default.createElement(Card_1.Card, { text: text, onDragStart: () => handleCardDragStart(id), onDragEnd: () => setDraggingCardID(undefined), onDeleteClick: () => onCardDeleteClick === null || onCardDeleteClick === void 0 ? void 0 : onCardDeleteClick(id) })));
                }),
                react_1.default.createElement(Card_1.Card.DropArea, { style: { height: '100%' }, disabled: draggingCardID !== undefined &&
                        ((_c = cards[cards.length - 1]) === null || _c === void 0 ? void 0 : _c.id) === draggingCardID, onDrop: () => onCardDrop === null || onCardDrop === void 0 ? void 0 : onCardDrop(null) }))))));
}
exports.Column = Column;
const Container = styled_components_1.default.div `
  display: flex;
  flex-flow: column;
  width: 355px;
  height: 100%;
  border: solid 1px ${color.Silver};
  border-radius: 6px;
  background-color: ${color.LightSilver};

  > :not(:last-child) {
    flex-shrink: 0;
  }
`;
const Header = styled_components_1.default.div `
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px;
`;
const CountBadge = styled_components_1.default.div `
  margin-right: 8px;
  border-radius: 20px;
  padding: 2px 6px;
  color: ${color.Black};
  background-color: ${color.Silver};
  font-size: 12px;
  line-height: 1;
`;
const ColumnName = styled_components_1.default.div `
  color: ${color.Black};
  font-size: 14px;
  font-weight: bold;
`;
const AddButton = styled_components_1.default.button.attrs({
    type: 'button',
    children: react_1.default.createElement(icon_1.PlusIcon, null),
}) `
  margin-left: auto;
  color: ${color.Black};

  :hover {
    color: ${color.Blue};
  }
`;
const InputForm = (0, styled_components_1.default)(InputForm_1.InputForm) `
padding:8px;
`;
const Loading = styled_components_1.default.div.attrs({
    children: 'Loading...',
}) `
  padding: 8px;
  font-size: 14px;
`;
const ResultCount = styled_components_1.default.div `
color: ${color.Black};
font-size:12px;
text-align: center;
`;
const VerticalScroll = styled_components_1.default.div `
  height: 100%;
  padding: 8px;
  overflow-y: auto;
  flex: 1 1 auto;

  > :not(:first-child) {
    margin-top: 8px;
  }
`;
