export interface IDocumentary {
    documentary_id: string;
    title: string;
    genre: string;
    language: string;
    borrowed_by: string;
    directed_by: string;
    available: boolean;
    publishedDate?: string | null | Date;
    date_of_borrow: string | null | Date;
    expected_date_of_return: string | null | Date;
}