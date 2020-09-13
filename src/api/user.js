import { sleep } from '../utils/promise';
import { formData } from '../utils/form';

export async function login(api, { email, password }) {
    const data = new FormData();
    data.set('email', email);
    data.set('password', password);

    const response = await api({
        method: 'POST',
        url: `/auth/login`,
        ...formData({ email, password }),
        validateStatus: (status) => status === 200 || status === 400
    });

    return {
        success: response.status === 200,
        invalidKeys: response.data.key
    };
}

export async function forgotPassword(api, { email }) {
    const response = await api({
        method: 'POST',
        url: `/auth/resetpassword`,
        data: { email }
    });
    return response.data;
}

export async function register(api, { email, username, password }) {
    const response = await api({
        method: 'POST',
        url: `/auth/register`,
        ...formData({ email, username, password })
    });

    return response.data;
}

export async function logout(api) {
    await api({
        method: 'POST',
        url: `/auth/logout`
    });
}

export async function getCurrentUser(api) {
    const response = await api({
        url: `/users/me`,
        validateStatus: (status) => status === 200 || status === 401
    });

    if (response.status === 401) {
        // AKA not logged in
        return null;
    } else {
        return response.data;
    }
}
