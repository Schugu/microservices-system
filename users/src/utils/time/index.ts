export const getFormattedTime = () => {
    const now = new Date()

    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')

    return `${hours}:${minutes}:${seconds}`
}
export const getFormattedDate = () => {
    const today = new Date()

    const day = String(today.getDate()).padStart(2, '0')
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const year = today.getFullYear()

    return `${day}-${month}-${year}`
}

export const convertSecondsToTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    // Aseguramos que los valores tengan dos dígitos
    const formattedHours = String(hours).padStart(2, '0')
    const formattedMinutes = String(minutes).padStart(2, '0')
    const formattedSeconds = String(seconds).padStart(2, '0')

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
}
export const getDifferenceInSeconds = (date1: Date, date2: Date) => {
    const diffInMs = Math.abs(date2.getTime() - date1.getTime());
    const diffInSeconds = Math.floor(diffInMs / 1000);
    return diffInSeconds;
}

export const addSecondsToDate = (date: Date, seconds: number): Date => {
    const milliseconds = seconds * 1000; // Convert seconds to milliseconds
    return new Date(date.getTime() + milliseconds); // Add milliseconds to the current date
}