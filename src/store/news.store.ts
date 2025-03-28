import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface NewsItem {
    id: string
    title: string
    content: string
    createdAt: Date
}

interface NewsStore {
    news: NewsItem[]
    addNews: (title: string, content: string) => void
    updateNews: (id: string, title: string, content: string) => void
    deleteNews: (id: string) => void
}

export const useNewsStore = create<NewsStore>()(
    persist(
        (set) => ({
            news: [],
            addNews: (title, content) => {
                set((state) => ({
                    news: [
                        ...state.news,
                        {
                            id: crypto.randomUUID(),
                            title,
                            content,
                            createdAt: new Date(),
                        },
                    ],
                }))
            },
            updateNews: (id, title, content) => {
                set((state) => ({
                    news: state.news.map((item) =>
                        item.id === id ? { ...item, title, content } : item
                    ),
                }))
            },
            deleteNews: (id) => {
                set((state) => ({
                    news: state.news.filter((item) => item.id !== id),
                }))
            },
        }),
        {
            name: "news-storage",
        }
    )
)
