import Link from "next/link"

const Header = () => {
  return(
    <header className="fixed inset-x-0 top-0 z-50 flex h-8 items-center justify-between px-6 bg-black/95 backdrop-blur-md border-b border-gray-800 shadow-lg">
      <Link href="/" className="text-2xl font-bold text-white tracking-tight hover:text-blue-400 transition">
        Law Route
      </Link>

      <div className="flex items-center gap-8">
        <Link href="/login" className="text-gray-300 font-medium hover:text-white hover:underline underline-offset-4 transition">
          ログイン
        </Link>
        <Link href="/register" className="text-gray-300 font-medium hover:text-white hover:underline underline-offset-4 transition">
          ユーザー登録
        </Link>
        <Link href="/mypage" className="flex items-center justify-center px-4 bg-blue-600 text-white font-medium rounded-lg  text-center hover:bg-blue-500 hover:shadow-lg transition">
          マイページ
        </Link>
      </div>
    </header>
  )
}

export default Header 