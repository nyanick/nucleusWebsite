/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    images: {
        domains: [
            'localhost:8000',
            'www.google.com',
            'www.pexels.com',
            'images.pexels.com',
            'media-exp1.licdn.com',
            '127.0.0.1',
            'localhost'
        ]
    }
}
