import { Badge } from "@/components/ui/badge"

export const sections = [
  {
    id: 'hero',
    subtitle: <Badge variant="outline" className="text-[#FF4D00] border-[#FF4D00] font-mono tracking-widest uppercase text-xs">Nothing Device Expert</Badge>,
    title: "Твой эксперт по Nothing и CMF.",
    showButton: true,
    buttonText: 'Спросить ИИ'
  },
  {
    id: 'about',
    title: 'Знаю всё о Nothing.',
    content: 'Phone (1), Phone (2), Phone (2a), CMF Phone 1 — полные характеристики, сравнения и честные ответы на любой вопрос о линейке Nothing и CMF by Nothing.'
  },
  {
    id: 'features',
    title: 'Что умеет ассистент',
    content: 'Сравни устройства, узнай характеристики камеры, батареи, дисплея. Подбери смартфон под твой бюджет и задачи. Всё — в одном чате.'
  },
  {
    id: 'testimonials',
    title: 'Nothing OS. CMF. Dot Matrix.',
    content: 'Уникальный дизайн, прозрачная эстетика, Glyph Interface — Nothing создаёт устройства, которые выделяются. Я помогу разобраться в каждой детали.'
  },
  {
    id: 'join',
    title: 'Начни разговор.',
    content: 'Задай любой вопрос о смартфонах Nothing и CMF — характеристики, сравнение, советы по выбору. ИИ ответит мгновенно.',
    showButton: true,
    buttonText: 'Задать вопрос'
  },
]
