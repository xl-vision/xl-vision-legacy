import * as React from 'react'

export interface PopperContextType {
  onPopupClick: () => void
}

export default React.createContext<PopperContextType>({
  // tslint:disable-next-line:no-empty
  onPopupClick: () => {}
})
