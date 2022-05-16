const fruits = [
    {
        id: 1,
        title: 'apple',
        text: 'Its new wonderful aple'
    },
    {
        id: 2,
        title: 'Orange',
        text: 'Its new wonderful aple',
    },
    {
        id: 3,
        title: 'Mango',
        text: 'Its new wonderful aple'
    },
]

const myModal = $.modal({
    title: 'New model in now',
    closable: true,
    content: `<h4>Content for model</h4>`,
    width: '400px',
    footerButtons: [
        {
            text: 'OK',
            type: 'primary',
            handler() {
                console.log('new primary button')
            }
        },
        {
            text: 'WRONG',
            type: 'danger',
            handler() {
                console.log('new WRONG button')
            }
        },
    ]
})

function openModal(currentOptions){
    $.modal(currentOptions).open()
}
function _createBlock(fruits) {
    const $block = document.createElement('div')
    $block.classList.add('row')

    fruits.forEach(fruit => {
        let currentOptions = {
            title: fruit.title,
            content: fruit.text,
            width: '450px',
            footerButtons: [
                {
                    text: 'OK',
                    type: 'primary',
                    handler() {
                        console.log('new primary button')
                    }
                },
            ]
        }

        let $part = document.createElement('div')
        $part.classList.add('col')
        const $btn = document.createElement('button')

        $btn.textContent = 'Open Modal'
        $btn.classList.add('btn')
        $btn.classList.add(`btn-secondary`)
        $btn.onclick = $.modal(currentOptions).open

        const $removeBtn = document.createElement('button')
        $removeBtn.textContent = 'Delete'
        $removeBtn.classList.add('btn')
        $removeBtn.classList.add(`btn-secondary`)
        $removeBtn.onclick = funcDelete

        $part.insertAdjacentHTML('afterbegin', `
            <img src="https://st.kinobase.org/storage/360x534/posters/2019/03/9eee5d271776567b6d2e.jpg" class="card-img-top" alt="..." style="max-height: 200px">
                    <div class="card-body">
                        <h5 class="card-title">${fruit.title}</h5>
                        <p class="card-text">${fruit.text}</p>
                    </div>
        `)
        $part.appendChild($btn)
        $part.appendChild($removeBtn)
        $block.appendChild($part)
    })

    document.querySelector('.container').appendChild($block)
}

function funcDelete() {
    $.confirm({
        title: 'Are you shure?',
        content: 'You want delete this objects?'
    })
        .then( () => console.log('Remove'))
        .catch(() => console.log('Cancel'))
}

document.addEventListener('click', event => {
    const btnType = event.target.dataset
})
_createBlock(fruits)