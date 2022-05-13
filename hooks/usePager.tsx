import Link from "next/link";

type Options = {
  page: number;
  total: number;
  count?: number;
  urlMaker?: (n: number) => string;
}
const defaultUrlMark = (n) => `?page=${n}`

export function usePager(options: Options) {
  const { page, total, count, urlMaker: _urlMaker } = options
  const urlMaker = _urlMaker || defaultUrlMark
  const numbers = []
  numbers.push(1)
  for(let i = page - 2; i <= page + 2; i++) {
    numbers.push(i)
  }
  numbers.push(total)
  const pageNumbers = [...new Set(numbers)].filter((item) => item >= 1 && item <= total).reduce((result, current) => {
    return current - (result[result.length - 1] || 0) === 1 ? result.concat(current) : result.concat(-1, current)
  }, [])
  return (
    <>
      <div>
        <span>共 {count} 篇文章，当前 {page}/{total}，</span>
        {page > 1 && <Link href={urlMaker(page - 1)}>
          <a>上一页</a>
        </Link>}
        {pageNumbers.map((item, index) =>(
          item === -1 ? <span key={index}>...</span> : (
            <Link key={index} href={urlMaker(item)}>
              <a className="page-button">{item}</a>
            </Link>
          )
        ))}
        {page < total && <Link href={urlMaker(page + 1)}>
          <a>下一页</a>
        </Link>}
      </div>
      <style jsx>{`
      .page-button {
        border: 1px solid #ced1d7;
        line-height: 2.2;
        padding: 0 8px;
        margin: 0 2px;
      }
    `}</style>
    </>
  )
}