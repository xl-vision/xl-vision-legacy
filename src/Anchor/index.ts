import Anchor from './Anchor'
import Link from './Link'

export { default as Anchor } from './Anchor'
export { default as Link } from './Link'

const AnchorWithLink = Anchor as typeof Anchor & {
  Link: typeof Link
}

AnchorWithLink.Link = Link

export default AnchorWithLink
