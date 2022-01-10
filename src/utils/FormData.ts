export const generateFormData = (data: any) => {
    let urlData = new FormData() 
    for (const key in data) {
        urlData.append(key, String(data[key]))
    }

    return urlData
}