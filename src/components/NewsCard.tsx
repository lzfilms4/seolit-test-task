import { NewsItem } from "../store/news.store"
import { Button } from "./ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card"

interface NewsCardProps {
    item: NewsItem
    onEdit: (newsItem: NewsItem) => void
    onDelete: (id: string) => void
}

export default function NewsCard({ item, onEdit, onDelete }: NewsCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="break-words overflow-hidden text-ellipsis">
                    {item.title}
                </CardTitle>
                <CardDescription>
                    {new Date(item.createdAt).toLocaleDateString()}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="break-words overflow-wrap whitespace-pre-line">
                    {item.content}
                </p>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => onEdit(item)}>
                    Редактировать
                </Button>
                <Button variant="destructive" onClick={() => onDelete(item.id)}>
                    Удалить
                </Button>
            </CardFooter>
        </Card>
    )
}
