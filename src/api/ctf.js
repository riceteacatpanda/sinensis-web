import { sleep } from '../utils/promise';

export async function getCtfInfo(api) {
    const response = await api({
        url: '/info'
    });

    return response.data;
}
