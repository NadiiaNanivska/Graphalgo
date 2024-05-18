export const validatePassword = (rule: any, value: string) => {
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).(?=.*\d).[^А-Яа-яЇїІіЄєҐґЁё]+$/.test(value)) {
        return Promise.resolve();
    }
    return Promise.reject('Пароль повинен містити щонайменше по одній великій та малій літері, а також цифру');
};
