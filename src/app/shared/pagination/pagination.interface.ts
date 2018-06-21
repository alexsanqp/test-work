export interface IPagination {
    onPage(n: number): void;

    onPrev(): void;

    onNext(next: boolean): void;

    totalPages(): number;

    lastPage(): boolean;

    getPages(): number[];
}
