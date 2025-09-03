type Props = {
  total: number;
  page: number;
  onChange: (p: number) => void;
  pageSize?: number;
};

export default function Pagination({
  total,
  page,
  onChange,
  pageSize = 5,
}: Props) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pageChage = (p: number) =>
    onChange(Math.min(Math.max(1, p), totalPages));

  return (
    <nav
      className="flex justify-end items-center gap-2 text-[14px]"
      aria-label="페이지네이션"
    >
      <span className="mr-2">
        {page} 페이지 중 {totalPages}
      </span>

      <button
        type="button"
        onClick={() => pageChage(page - 1)}
        disabled={page <= 1}
        className="px-3 py-1 rounded-md border border-[#D9D9D9] disabled:opacity-40"
        aria-label="이전 페이지"
      >
        이전
      </button>
      <button
        type="button"
        onClick={() => pageChage(page + 1)}
        disabled={page >= totalPages}
        className="px-3 py-1 rounded-md border border-[#D9D9D9] disabled:opacity-40"
        aria-label="다음 페이지"
      >
        다음
      </button>
    </nav>
  );
}
