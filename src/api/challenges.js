import { sleep } from '../utils/promise';

export async function getChallenges(api) {
    const response = await api({ url: '/challenges' });
    return response.data;
}

export async function deleteChallengeForId(api, { id }) {
    const response = await api({
        method: 'DELETE',
        url: `/challenges/${id}`
    });

    return response.data;
}

export async function getChallengeForId(api, { id }) {
    const response = await api({
        url: `/challenges/${id}`
    });
    return response.data;
}

export async function updateChallengeForId(api, { id, data }) {
    const response = await api({
        method: 'PUT',
        url: `/challenges/${id}`,
        data: data
    });
    return response.data;
}

export async function submitChallenge(api, { challengeId, flag }) {
    const response = await api({
        method: 'POST',
        url: `/challenges/${challengeId}/submit`,
        data: { flag }
    });

    return { isCorrect: response.data.status === "ok" };
}
