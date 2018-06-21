export interface IPager {
    goToPage(page: number): void;

    onNext(): void;

    onPrev(): void;
}
