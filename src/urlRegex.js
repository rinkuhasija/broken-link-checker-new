const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

const isValidUrl = (url) => {
    return urlRegex.test(url);
};

export default isValidUrl;