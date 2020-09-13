export async function getTeam(api, { id }) {
    const response = await api({ url: `/team/${id}` });
    return response.data;
}
