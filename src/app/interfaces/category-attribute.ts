export interface CategoryAttribute {
    id: number;
    name: string;
    possible_values: Array<string>;
    show_in_filter: boolean;
    category_id: number;
}