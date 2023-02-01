export interface INewspaper {
    newspaper_id: string;
    title: string;
    newsContent: string;
    language: string;
    publishedDate?: string | null | Date;
    available: boolean;
    borrowed_by: string;
    date_of_borrow: string | null | Date;
    expected_date_of_return: string | null | Date;
}