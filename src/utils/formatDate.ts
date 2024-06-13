export const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);

    return {
        day: date.toLocaleDateString('en-US', { weekday: 'long' }),
        month: date.toLocaleString('default', { month: 'long' }),
        date: date.getDate()
    }
}
