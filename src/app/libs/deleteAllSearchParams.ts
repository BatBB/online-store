export default function deleteAllSearchParams() {
    const params = new URLSearchParams(window.location.search);
    [...params.keys()].forEach((n) => ['page', 'count'].includes(n) || params.delete(n));
}
