import cloudinary from 'cloudinary';

cloudinary.config({
    cloud_name: 'ddzj5atmw',
    api_key: '697143246856642',
    api_secret: 'ZGONTtcJiG66GWMC8PvkM-rJ7ZM'
});

export const uploads = (file, folder) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) => {
            resolve({
                url: result.url,
                id: result.public_id
            })
        }, {
            resource_type: "auto",
            folder: folder
        })
    })
}

// export default cloudinary