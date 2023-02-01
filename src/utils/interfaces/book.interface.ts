export interface IBook {
    book_id: string;
    title: string;
    available: boolean;
    author: string;
    borrowed_by: string;
    date_of_borrow: string | null | Date;
    expected_date_of_return: string | null | Date;
}