import { FC, ReactElement, ReactNode, useMemo } from 'react'
import Link from 'next/link'
import styles from 'styles/components/RedirectionLink.module.css'

interface IProps {
  buttonStyled?: boolean
  children?: ReactNode
  href: string
  transparent?: boolean
}

const RedirectionLink: FC<IProps> = ({
  buttonStyled = false,
  href,
  children,
  transparent = false
}): ReactElement => {
  const classname = useMemo(() => {
    if(!buttonStyled) return ''

    return transparent ? styles.transparentLink : styles.link
  }, [buttonStyled, transparent])

  return (
    <Link href={href}>
      <a className={classname}>{children}</a>
    </Link>
  )
}

export default RedirectionLink