let data = JSON.parse(localStorage.getItem('x')) || [
    {
        url: 'baidu.com',
        trueUrl: 'https://www.baidu.com'
    },
    {
        url: 'jquery123.com',
        trueUrl: 'https://www.jquery123.com'
    }
]

let render = function () {
    $('.item-list:not(.item-list-increase)').remove()
    data.forEach((el, index) => {
        const $li = $(`<li class='item-list'>
        <a href=${el.trueUrl}>
            <div class="item-list-icon">${el.icon || el.url[0]}</div>
            <div class="item-list-url">${el.url}</div>
            <div class='close'>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-cross"></use>
                </svg>
            </div>
        </a>
        </li>`).insertBefore('.item-list-increase')
        // 绑定事件的时机在每次渲染的时候，如果不这样新增的元素就没有事件
        // on函数的可选参数
        $li.on('click', '.close', (el) => {
            data.splice(index, 1)
            // 阻止a标签的跳转
            el.preventDefault()
            render()
        })
    })
}

render()

$('.item-list-increase').on('click', function () {
    let newurl = prompt('请输入新增的网址')
    if (newurl && (newurl.indexOf('https://') !== -1 || newurl.indexOf('http://')) !== -1) {
        let newitem = {
            url: newurl.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, ''),
            trueUrl: newurl
        }
        data.push(newitem)
        render()
    } else {
        alert('请输入完整网址,包括http或https')
    }
})

$(window).on('keypress', (el) => {
    const key = el.key
    data.forEach((item) => {
        if (item.url[0] === key.toLowerCase()) {
            window.open(item.trueUrl)
        }
    })
})

window.onbeforeunload = () => {
    localStorage.setItem('x', JSON.stringify(data))
}






