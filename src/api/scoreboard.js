export async function getScoreboard(api) {
    const response = await api({ url: '/scoreboard' });
    const { scores } = response.data;
    return {
        scores: scores || []
    };
}
