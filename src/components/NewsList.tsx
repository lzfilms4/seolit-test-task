import { useState } from "react"

import { Button } from "./ui/button"

import NewsCard from "./NewsCard"
import NewsDialog from "./NewsDialog"

import { useNewsStore, NewsItem } from "../store/news.store"

export default function NewsList() {
    const { news, deleteNews, addNews, updateNews } = useNewsStore()

    // NewsItem - editing, null - new, undefined - closed
    const [editingNews, setEditingNews] = useState<NewsItem | null | undefined>(
        undefined
    )

    const handleSubmit = (title: string, content: string) => {
        if (editingNews) {
            updateNews(editingNews.id, title, content)
        } else {
            addNews(title, content)
        }
    }

    const handleEdit = (newsItem: NewsItem) => {
        setEditingNews(newsItem)
    }

    const handleDelete = (id: string) => {
        deleteNews(id)
    }

    const handleCloseDialog = () => {
        setEditingNews(undefined)
    }

    const handleAddNews = () => {
        setEditingNews(null)
    }

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Новости</h1>
                <Button onClick={handleAddNews}>Добавить новость</Button>
            </div>

            <NewsDialog
                newsItem={editingNews}
                isOpen={editingNews !== undefined}
                onSubmit={handleSubmit}
                onClose={handleCloseDialog}
            />

            <div className="space-y-4">
                {news.length === 0 ? (
                    <p className="text-center text-gray-500">
                        Новостей пока нет
                    </p>
                ) : (
                    news.map((item) => (
                        <NewsCard
                            key={item.id}
                            item={item}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))
                )}
            </div>
        </div>
    )
}
