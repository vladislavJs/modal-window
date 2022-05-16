$.confirm = function (options) {
    return new Promise((resolve, reject) => {
        const modal = $.modal({
            title: options.title,
            width: '400px',
            content: options.content,
            onClose () {
                modal.destroy()
            },
            closable: false,
            footerButtons: [
                {
                    text: 'Cancel',
                    type: 'secondary',
                    handler() {
                        modal.close()
                        reject()
                    }
                },
                {
                    text: 'Delete',
                    type: 'danger',
                    handler() {
                        modal.close()
                        resolve()
                    }
                },

            ]

        })

        modal.open()
    })
}