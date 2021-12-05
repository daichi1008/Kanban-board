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
exports.InputForm = void 0;
const react_1 = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const color = __importStar(require("./color"));
const Button_1 = require("./Button");
function InputForm({ value, onChange, onConfirm, onCancel, className, }) {
    const disabled = !(value === null || value === void 0 ? void 0 : value.trim());
    const handleConfirm = () => {
        if (disabled)
            return;
        onConfirm === null || onConfirm === void 0 ? void 0 : onConfirm();
    };
    const ref = useAutoFitToContentHeight(value);
    return (react_1.default.createElement(Container, { className: className },
        react_1.default.createElement(Input, { ref: ref, autoFocus: true, placeholder: "Enter a note", value: value, onChange: ev => onChange === null || onChange === void 0 ? void 0 : onChange(ev.currentTarget.value), onKeyDown: ev => {
                if (!((ev.metaKey || ev.ctrlKey) && ev.key === 'Enter'))
                    return;
                handleConfirm();
            } }),
        react_1.default.createElement(ButtonRow, null,
            react_1.default.createElement(AddButton, { disabled: disabled, onClick: handleConfirm }),
            react_1.default.createElement(CancelButton, { onClick: onCancel }))));
}
exports.InputForm = InputForm;
//テキストエリアの高さを内容に合わせて自動調整する
//@param content テキストエリアの内容
function useAutoFitToContentHeight(content) {
    const ref = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        const el = ref.current;
        if (!el)
            return;
        const { borderTopWidth, borderBottomWidth } = getComputedStyle(el);
        el.style.height = 'auto';
        el.style.height = `calc(${borderTopWidth}+ ${el.scrollHeight}px + ${borderBottomWidth})`;
    }, 
    //内容が変わるたびに高さを再計算
    [content]);
    return ref;
}
const Container = styled_components_1.default.div ``;
const Input = styled_components_1.default.textarea `
  display: block;
  width: 100%;
  margin-bottom: 8px;
  border: solid 1px ${color.Silver};
  border-radius: 3px;
  padding: 6px 8px;
  background-color: ${color.White};
  font-size: 14px;
  line-height: 1.7;

  :focus {
    outline: none;
    border-color: ${color.Blue};
  }
`;
const ButtonRow = styled_components_1.default.div `
  display: flex;

  > :not(:first-child) {
    margin-left: 8px;
  }
`;
const AddButton = (0, styled_components_1.default)(Button_1.ConfirmButton).attrs({
    children: 'Add',
}) ``;
const CancelButton = (0, styled_components_1.default)(Button_1.Button).attrs({
    children: 'Cancel',
}) ``;
