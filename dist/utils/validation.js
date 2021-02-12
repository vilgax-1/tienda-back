"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegisterProduct = exports.buildValidatorProduct = exports.validateRegisterForm = exports.validateLoginForm = exports.buildValidator = void 0;
const validatorjs_1 = __importDefault(require("validatorjs"));
validatorjs_1.default.useLang("es");
const attributeNames = {
    name: "nombre",
    lastName: "apellido",
    email: "correo electrónico",
    password: "contraseña",
    old_password: "antigua constraseña",
};
const attributeProduct = {
    nombre: "Nombre",
    precio: "Precio",
    tamano: "Tamaño",
    link: "Link"
};
exports.buildValidator = (data, rules) => {
    const validator = new validatorjs_1.default(data, rules);
    validator.setAttributeNames(attributeNames);
    return validator;
};
exports.validateLoginForm = (data) => {
    const rules = {
        email: "required|email",
        password: "required",
    };
    return exports.buildValidator(data, rules);
};
exports.validateRegisterForm = (data) => {
    const rules = {
        name: "required",
        email: "required|email",
        password: "required|min:5",
    };
    return exports.buildValidator(data, rules);
};
exports.buildValidatorProduct = (data, rules) => {
    const validator = new validatorjs_1.default(data, rules);
    validator.setAttributeNames(attributeProduct);
    return validator;
};
exports.validateRegisterProduct = (data) => {
    const rules = {
        nombre: "required",
        precio: "required",
        tamano: "required",
        link: "required"
    };
    return exports.buildValidatorProduct(data, rules);
};
