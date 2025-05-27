export const API_URLS = {
    BASE_URL: 'https://qauto.forstudy.space/api',
    cars: {
        get: '/cars',
        post: '/cars',
        put: (id: string) => `/cars/${id}`,
        delete: (id: string) => `/cars/${id}`
    },
    expenses: {
        get: (id: string) => `/expenses/${id}`,
        post: '/expenses'
    }
}