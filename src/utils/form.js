// Converts data into axios config
export function formData(data, headers = {}) {
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
        formData.set(key, value);
    }
    return {
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
}
