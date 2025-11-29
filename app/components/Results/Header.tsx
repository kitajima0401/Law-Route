import Link from "next/link"

const Header = () => {
  return(
    <header>
      <Link href={"/pages/Homepage"}>Law Route</Link>
      <Link href={"/pages/login"}>ログイン</Link>
      <Link href={"/pages/register"}>ユーザー登録</Link>
      <Link href={"/pages/mypage"}>マイページ</Link>
    </header>
  )
}

export default Header 