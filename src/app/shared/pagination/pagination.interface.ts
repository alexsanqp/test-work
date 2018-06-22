export interface IPagination {
    onPage(n: number): void;

    onPrev(): void;

    onNext(): void;

    totalPages(): number;

    lastPage(): boolean;

    getPages(): number[];
}
