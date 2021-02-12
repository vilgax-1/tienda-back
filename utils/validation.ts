import Validator from 'validatorjs';
Validator.useLang("es");

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
}

export const buildValidator = (data:any, rules: any) =>{
    const validator = new Validator(data, rules);
    validator.setAttributeNames(attributeNames);
    return validator;
}

export const validateLoginForm = (data: any) => {
    const rules = {
        email: "required|email",
        password: "required",
    };
    return buildValidator(data, rules);
}

export const validateRegisterForm = (data: any) =>{
    const rules = {
        name: "required",
        email: "required|email",
        password: "required|min:5",
    };
    return buildValidator(data, rules);
}


export const buildValidatorProduct = (data: any,  rules: any ) => {
    const validator = new Validator(data, rules);
    validator.setAttributeNames(attributeProduct);
    return validator;
}

export const validateRegisterProduct = (data: any) => {
    const rules = {
        nombre: "required",
        precio: "required",
        tamano: "required",
        link: "required"
    };
    return buildValidatorProduct(data, rules);
}