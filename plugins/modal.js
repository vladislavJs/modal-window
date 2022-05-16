Element.prototype.appendAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling)
}

function noop() {}

function _createModalFooter(buttons = []){
    const wrap = document.createElement('div')
    if(buttons.length === 0) {
        return wrap
    }

    wrap.classList.add('modal-footer')
    buttons.forEach(button => {
        const $btn = document.createElement('button')
        $btn.textContent = button.text
        $btn.classList.add('btn')
        $btn.classList.add(`btn-${button.type || 'secondary'}`)
        $btn.onclick = button.handler || noop
        wrap.appendChild($btn)
    })

    return wrap
}

function _createModal(options) {
    const DEFAULT_WIDTH = '500px'
    const modal = document.createElement('div')
    const closeSpan = options.closable ? '<span class="modal-close" data-close="true">&times;</span>' : ''
    modal.classList.add('vmodal')
    modal.insertAdjacentHTML('afterbegin', `
        <div class="modal-overlay" data-close="true">
            <div class="modal-window" style="width: ${options.width || DEFAULT_WIDTH}">
                <div class="modal-header">
                    <span class="modal-title">${options.title || ''}</span>
                    ${closeSpan}
                </div>
                <div class="modal-body" data-content="true">
                    ${options.content || ''}
                </div>
            </div>
        </div>
    `)
    const footer = _createModalFooter(options.footerButtons)
    footer.appendAfter(modal.querySelector('[data-content]'))
    document.body.appendChild(modal)

    return modal
}

$.modal = function (options) {
    const ANIMATION_SPEED = 400
    const $modal  =  _createModal(options)
    let closing = false
    let destroyed = false

    const modal = {
        open() {
            if(destroyed) {
                return console.log('destroyed_modal')
            }
            !closing && $modal.classList.add('open')
        },
        close() {
            closing = true
            $modal.classList.remove('open')
            $modal.classList.add('closed')
            if(typeof options.onClose === 'function'){
                options.onClose()
            }
            setTimeout(() => {
                $modal.classList.remove('closed')
                closing = false
            }, ANIMATION_SPEED)
        },
        destroy() {}
    }

    const listener = event => {
        if(event.target.dataset.close) {
            modal.close()
        }
    }

    $modal.addEventListener('click', listener)

    return Object.assign(modal, {
        destroy() {
            destroyed = true
            $modal.parentNode.removeChild($modal)
            $modal.removeEventListener('click', listener)
        },
        setHtml(html) {
            $modal.querySelector('[data-content]').innerHTML = html
        }
    })
}

// options: title, closable, content, width(400px)
//closed window
//setContent(html) - string | public
// onclose() : void
// onopen() : void
//beforeClose() : boolean
//animate.css