import { useState, useEffect } from "react"
import { useNewsStore, NewsItem } from "../store/news.store"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"

interface NewsFormProps {
    newsItem: NewsItem | null
    onClose: () => void
}

export default function NewsForm({ newsItem, onClose }: NewsFormProps) {
    const { addNews, updateNews } = useNewsStore()
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    useEffect(() => {
        if (newsItem) {
            setTitle(newsItem.title)
            setContent(newsItem.content)
        } else {
            setTitle("")
            setContent("")
        }
    }, [newsItem])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!title.trim() || !content.trim()) return

        if (newsItem) {
            updateNews(newsItem.id, title, content)
        } else {
            addNews(title, content)
        }

        setTitle("")
        setContent("")
        onClose()
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {newsItem ? "Редактировать новость" : "Добавить новость"}
                </CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="title" className="text-sm font-medium">
                            Заголовок
                        </label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Введите заголовок"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label
                            htmlFor="content"
                            className="text-sm font-medium"
                        >
                            Содержание
                        </label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Введите содержание новости"
                            className="w-full min-h-[120px] px-3 py-2 border rounded-md resize-none"
                            required
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={onClose}>
                        Отмена
                    </Button>
                    <Button type="submit">
                        {newsItem ? "Сохранить" : "Добавить"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}
