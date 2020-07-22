import { Classes } from 'jss'
import { StyleName } from '../createUseStyles'

function mergeClasses<C extends StyleName = string>(
  baseClasses: Classes<C>,
  additionalClasses?: Classes<C>
) {
  if (!additionalClasses) {
    return baseClasses
  }

  const combinedClasses: Classes<C> = { ...baseClasses }

  Object.keys(additionalClasses).forEach((key) => {
    const name = key as C
    combinedClasses[name] =
      name in combinedClasses
        ? `${combinedClasses[name]} ${additionalClasses[name]}`
        : additionalClasses[name]
  })

  return combinedClasses
}

export default mergeClasses
