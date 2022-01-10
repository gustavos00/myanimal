export const generateUrlSearchParams = (data: any) => {
    let urlData = new URLSearchParams() 
    for (const key in data) {
        urlData.append(key, String(data[key]))
    }

    return urlData
}