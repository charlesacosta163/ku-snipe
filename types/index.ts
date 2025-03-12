export interface User {
        id: string
        email?: string | null
        name?: string | null
        image?: string | null
        tier: 'scout' | 'sharpshooter' | 'elite'
}

export interface Session {
    user: User
}

