import { useState, useEffect } from "react"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "./ui/dialog"

import { NewsItem } from "@/store/news.store"

interface NewsDialogProps {
    newsItem: NewsItem | null | undefined
    isOpen: boolean
    onSubmit: (title: string, content: string) => void
    onClose: () => void
}

export default function NewsDialog({
    newsItem,
    isOpen,
    onSubmit,
    onClose,
}: NewsDialogProps) {
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
    }, [newsItem, isOpen])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!title.trim() || !content.trim()) return

        onSubmit(title, content)

        setTitle("")
        setContent("")
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>
                        {newsItem
                            ? "Редактировать новость"
                            : "Добавить новость"}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <label
                                htmlFor="title"
                                className="text-sm font-medium"
                            >
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
                            <Textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Введите содержание новости"
                                className="w-full h-[120px] px-3 py-2 border rounded-md resize-none"
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                        >
                            Отмена
                        </Button>
                        <Button type="submit">
                            {newsItem ? "Сохранить" : "Добавить"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
