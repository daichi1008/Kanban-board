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
exports.Card = void 0;
const react_1 = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const color = __importStar(require("./color"));
const icon_1 = require("./icon");
Card.DropArea = DropArea;
function Card({ text, onDragStart, onDragEnd, onDeleteClick, }) {
    const [drag, setDrag] = (0, react_1.useState)(false);
    return (react_1.default.createElement(Container, { style: { opacity: drag ? 0.5 : undefined }, onDragStart: () => {
            onDragStart === null || onDragStart === void 0 ? void 0 : onDragStart();
            setDrag(true);
        }, onDragEnd: () => {
            onDragEnd === null || onDragEnd === void 0 ? void 0 : onDragEnd();
            setDrag(false);
        } },
        react_1.default.createElement(CheckIcon, null), text === null || text === void 0 ? void 0 :
        text.split(/(https?:\/\/\S+)/g).map((fragment, i) => i % 2 === 0 ? (react_1.default.createElement(Text, { key: i }, fragment)) : (react_1.default.createElement(Link, { key: i, href: fragment }, fragment))),
        react_1.default.createElement(DeleteButton, { onClick: onDeleteClick })));
}
exports.Card = Card;
const Container = styled_components_1.default.div.attrs({
    draggable: true,
}) `
  position: relative;
  border: solid 1px ${color.Silver};
  border-radius: 6px;
  box-shadow: 0 1px 3px hsla(0, 0%, 7%, 0.1);
  padding: 8px 32px;
  background-color: ${color.White};
  cursor: move;
`;
const CheckIcon = (0, styled_components_1.default)(icon_1.CheckIcon) `
  position: absolute;
  top: 12px;
  left: 8px;
  color: ${color.Green};
`;
const DeleteButton = styled_components_1.default.button.attrs({
    type: 'button',
    children: react_1.default.createElement(icon_1.TrashIcon, null),
}) `
  position: absolute;
  top: 12px;
  right: 8px;
  font-size: 14px;
  color: ${color.Gray};

  :hover {
    color: ${color.Red};
  }
`;
const Text = styled_components_1.default.span `
  color: ${color.Black};
  font-size: 14px;
  line-height: 1.7;
  white-space: pre-wrap;
`;
const Link = styled_components_1.default.a.attrs({
    target: '_blank',
    rel: 'noopener noreferrer',
}) `
  color: ${color.Blue};
  font-size: 14px;
  line-height: 1.7;
  white-space: pre-wrap;
`;
function DropArea({ disabled, onDrop, children, className, style, }) {
    const [isTarget, setIsTarget] = (0, react_1.useState)(false);
    const visible = !disabled && isTarget;
    const [dragOver, onDragOver] = useDragAutoLeave();
    return (react_1.default.createElement(DropAreaContainer, { style: style, className: className, onDragOver: ev => {
            if (disabled)
                return;
            ev.preventDefault();
            onDragOver(() => setIsTarget(false));
        }, onDragEnter: () => {
            if (disabled || dragOver.current)
                return;
            setIsTarget(true);
        }, onDrop: () => {
            if (disabled)
                return;
            setIsTarget(false);
            onDrop === null || onDrop === void 0 ? void 0 : onDrop();
        } },
        react_1.default.createElement(DropAreaIndicator, { style: {
                height: !visible ? 0 : undefined,
                borderWidth: !visible ? 0 : undefined,
            } }),
        children));
}
function useDragAutoLeave(timeout = 100) {
    const dragOver = (0, react_1.useRef)(false);
    const timer = (0, react_1.useRef)(0);
    return [
        dragOver,
        (onDragLeave) => {
            clearTimeout(timer.current);
            dragOver.current = true;
            timer.current = setTimeout(() => {
                dragOver.current = false;
                onDragLeave === null || onDragLeave === void 0 ? void 0 : onDragLeave();
            }, timeout);
        },
    ];
}
const DropAreaContainer = styled_components_1.default.div `
  >::not(:first-child){
    margin-top:8px;
  }
`;
const DropAreaIndicator = styled_components_1.default.div `
height:40px;
border:dashed 3px ${color.Gray};
border-radius:  6px;
transition: all 50ms ease-out;
`;
