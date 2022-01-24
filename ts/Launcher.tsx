import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './components/App'

export default class Launcher {
  public static destroy (target: any): void {
    ReactDOM.unmountComponentAtNode(target)
  }

  protected target: string | HTMLElement
  protected ready: boolean

  constructor (target: string | HTMLElement) {
    this.target = target
    this.ready = true
  }

  protected render (cb?: () => any): void {
    if (!this.ready) {
      return
    }
    ReactDOM.render(
      (
        <App/>
      ) as any,
      typeof this.target === 'string'
        ? document.getElementById(this.target)
        : this.target,
      () => {
        if (typeof cb === 'function') {
          cb()
        }
      }
    )
  }
}
