export function isSameDay(dateStr1: string, dateStr2: string): boolean {
    const d1 = new Date(dateStr1);
    const d2 = new Date(dateStr2);
    return (
        d1.getFullYear() === d2.getFullYear()
        && d1.getMonth() === d2.getMonth()
        && d1.getDate() === d2.getDate()
    );
}

export function formatChatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const today = new Date();

    // Create dates with time reset to midnight for clean day-diff comparison
    const dDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const dToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const diffTime = dToday.getTime() - dDate.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";

    // If within the current year: e.g. "Oct 15"
    if (date.getFullYear() === today.getFullYear()) {
        return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
    }

    // If previous years: e.g. "Oct 15, 2025"
    return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}
