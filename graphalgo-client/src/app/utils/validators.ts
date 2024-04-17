export const validatePassword = (rule: any, value: string) => {
        if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).(?=.*\d).[^А-Яа-яЇїІіЄєҐґЁё]+$/.test(value)) {
            return Promise.resolve();
        }
        return Promise.reject('Password must contain at least one uppercase and lowercase letter, one number');
};
