import React, { useEffect } from 'react'
import { TableRow, TableCell } from '@/components/ui/table'
import events from "./Event_edit"

interface eventType {
    id: number;
    title: string;
    description: string;
    created_at: Date;
    event_date: Date;
    img_name: string;
    on_landing_page: boolean;
}
export default function EventRow({ item }: { item: eventType }) {
    return (
        <>
            {
            }
        </>
    )
}